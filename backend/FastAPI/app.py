from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

# تقليل رسائل TensorFlow المزعجة
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from disease_info import disease_info

app = FastAPI(title="Plant Disease Recognition API")

# إعدادات CORS محسنة
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "trained_model.h5"

try:
    # تحميل الموديل بدون تنفيذ الـ Compile لتوفير الوقت والذاكرة
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("✅ Model Loaded Successfully")
except Exception as e:
    print(f"❌ Failed to load model: {e}")

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

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((128, 128))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.get("/")
def home():
    return {"status": "online", "message": "✅ API is working"}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image")

    try:
        image_bytes = await image.read()
        input_tensor = preprocess_image(image_bytes)
        
        predictions = model.predict(input_tensor)
        index = int(np.argmax(predictions))
        label = class_names[index]

        # جلب البيانات من ملف disease_info
        info = disease_info.get(label, {
            "title": label,
            "desc": "No description available for this disease.",
            "advice": ["Consult an agricultural expert."]
        })

        return {
            "predicted_label": label,
            "title": info.get("title"),
            "description": info.get("desc"), # تم التأكد من توافقه مع الفرونت
            "advice": info.get("advice")
        }
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))