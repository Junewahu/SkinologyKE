# Shop backend: order tracking, inventory, MPESA payment, receipts
from flask import Blueprint, request, jsonify
import requests
shop_bp = Blueprint('shop', __name__)

@shop_bp.route('/order', methods=['POST'])
def create_order():
    data = request.json
    # Save order to database, update inventory
    # ...existing code...
    return jsonify({'status': 'Order created', 'order_id': '12345'})

@shop_bp.route('/mpesa', methods=['POST'])
def mpesa_payment():
    payload = request.json
    mpesa_url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {'Authorization': 'Bearer <access_token>'}
    response = requests.post(mpesa_url, json=payload, headers=headers)
    if response.ok:
        return jsonify({'status': 'Payment initiated'})
    return jsonify({'error': 'Payment failed'}), 400

@shop_bp.route('/receipt/<order_id>', methods=['GET'])
def get_receipt(order_id):
    # Generate and return receipt for order_id
    # ...existing code...
    return jsonify({'order_id': order_id, 'receipt': 'Receipt details here'})