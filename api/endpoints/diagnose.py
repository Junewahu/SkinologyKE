from flask import Blueprint, request, jsonify
import os
from ai_model.predict import predict
import logging

diagnose_bp = Blueprint('diagnose', __name__)
logger = logging.getLogger('diagnose')

# Simple rate limiting (pseudo-code)
RATE_LIMIT = {}

@diagnose_bp.route('/diagnose', methods=['POST'])
def diagnose():
    user_ip = request.remote_addr
    if RATE_LIMIT.get(user_ip, 0) > 10:
        return jsonify({'error': 'Rate limit exceeded'}), 429
    RATE_LIMIT[user_ip] = RATE_LIMIT.get(user_ip, 0) + 1
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
        image = request.files['image']
        image_path = os.path.join('/tmp', image.filename)
        image.save(image_path)
        symptoms = request.form.getlist('symptoms')
        diagnosis, confidence = predict(image_path)
        # Simple routine suggestion (mock)
        routine = 'Cleanse AM/PM, moisturize, use sunscreen.'
        logger.info(f"Diagnosis for {user_ip}: {diagnosis} ({confidence}%)")
        return jsonify({
            'diagnosis': diagnosis,
            'confidence': confidence,
            'routine': routine,
            'symptoms': symptoms
        })
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@diagnose_bp.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    logger.info(f"Feedback: {data}")
    return jsonify({'status': 'received'})