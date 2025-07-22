# Authentication: user profile, regimen/history saving, integration
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
auth_bp = Blueprint('auth', __name__)

def get_user_doc(user_id):
    db = firestore.client()
    return db.collection('users').document(user_id)

@auth_bp.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    doc = get_user_doc(user_id).get()
    return jsonify(doc.to_dict())

@auth_bp.route('/profile/<user_id>', methods=['POST'])
def update_profile(user_id):
    data = request.json
    get_user_doc(user_id).update(data)
    return jsonify({'status': 'Profile updated'})

@auth_bp.route('/history/<user_id>', methods=['POST'])
def save_history(user_id):
    diagnosis = request.json.get('diagnosis')
    get_user_doc(user_id).update({'diagnosis_history': firestore.ArrayUnion([diagnosis])})
    return jsonify({'status': 'Diagnosis history updated'})
