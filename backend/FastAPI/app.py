from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from quiz_generator import generate_quiz
from youtube_utils import get_transcript
from disease_info import disease_info
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "trained_model.h5")

app = FastAPI(title="Plant Disease Recognition API + Quiz System")

# ===============================
# CORS
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# LOAD MODEL (ONCE)
# ===============================
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# ===============================
# CLASS NAMES
# ===============================
class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
    'Apple___healthy', 'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# ===============================
# CACHE (SPEED BOOST)
# ===============================
quiz_cache = {}

# ===============================
# IMAGE PREPROCESSING
# ===============================
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((128, 128))
    img_array = np.array(image)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.get("/")
def health_check():
    return {"status": "online", "message": "Plant Disease Recognition API + Quiz System is running"}

# ===============================
# PREDICT ENDPOINT
# ===============================
@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image format")

    try:
        image_bytes = await image.read()
        input_tensor = preprocess_image(image_bytes)
        predictions = model.predict(input_tensor)
        index = int(np.argmax(predictions))
        label = class_names[index]

        info = disease_info.get(label, {})

        return {
            "predicted_label": label,
            "title": info.get("title", ""),
            "description": info.get("desc", ""),
            "advice": info.get("advice", [])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===============================
# VIDEO MAP (IMPORTANT FOR FRONTEND)
# ===============================
VIDEO_MAP = {
    "video1": "FpOWG4GDvx4",
    "video2": "V_1vpEEnXW0",
    "video3": "aLY46g18hWk",
    "video4": "tNbTppAbEVc",
    "video5": "AltruHFIBAQ",
    "video6": "xpAnLXc_bIU"
}

VIDEO_TOPICS = {
    "video1": "recycling for kids: what recycling means, why we recycle, sorting waste into categories, reusing old items, protecting the environment by not throwing trash on the ground",
    "video2": "paper for kids: what paper is, where paper comes from, how trees are used to make paper, different uses of paper in daily life, importance of recycling paper to save trees and protect the environment",
    "video3": "how a tree grows in stages: planting a seed, the seed sprouts, roots absorb water, tree grows thicker with branches and leaves, flowers bloom, tree bears fruit",
    "video4": "parts of a plant for kids: the leaf makes food through photosynthesis and releases oxygen, the stem supports the plant and carries water and nutrients, the flower is colorful and helps pollination and produces fruit and seeds, the fruit is fleshy and provides food, the roots hold the plant in soil and absorb water and nutrients",
    "video5": "recycling and keeping the environment clean: we love recycling, we clean up always no matter how simple, don't throw things on the ground, empty bottles and old items should be recycled, keeping our farm and surroundings clean",
    "video6": "recycling for kids: what recycling is, why recycling is important, reducing waste, reusing materials, protecting the environment, keeping the planet clean"
}

# ===============================
# QUIZ ENDPOINT
# ===============================
@app.get("/quiz/{video_key}")
def get_quiz(video_key: str):
    if video_key in quiz_cache:
        return quiz_cache[video_key]

    if video_key not in VIDEO_MAP:
        raise HTTPException(status_code=404, detail="Video not found")

    video_id = VIDEO_MAP[video_key]
    transcript = get_transcript(video_id)

    if transcript:
        quiz = generate_quiz(transcript[:2000])
    elif video_key in VIDEO_TOPICS:
        topic_text = VIDEO_TOPICS[video_key]
        quiz = generate_quiz(topic_text)
    else:
        raise HTTPException(
            status_code=422,
            detail=f"No transcript or fallback topic available for {video_key}"
        )

    result = {"video_key": video_key, "quiz": quiz}
    quiz_cache[video_key] = result
    return result