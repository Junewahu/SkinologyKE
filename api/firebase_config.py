# Firebase Storage/Firestore integration for gallery uploads
import firebase_admin
from firebase_admin import credentials, storage, firestore
import os

cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'your-bucket.appspot.com'})

def upload_image_to_firebase(image_path, user_id):
    bucket = storage.bucket()
    blob = bucket.blob(f'gallery/{user_id}/{os.path.basename(image_path)}')
    blob.upload_from_filename(image_path)
    db = firestore.client()
    db.collection('gallery').add({'user_id': user_id, 'image_url': blob.public_url, 'approved': False})

# Moderation and consent enforcement would be handled in the frontend/admin dashboard.
