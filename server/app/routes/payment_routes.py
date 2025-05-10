from flask import request, jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.database import db
from app.models.models import Payment, Order

class ProcessPayment(Resource):
    @jwt_required()
    def post(self, order_id):
        user_id = get_jwt_identity()
        order = Order.query.get(order_id)
        
        if not order:
            return {"error": "Order not found"}, 404
        if order.user_id != user_id:
            return {"error": "Unauthorized. You can only pay for your own orders."}, 403
        if order.status == "paid":
            return {"error": "Order is already paid."}, 400
        
        parser = reqparse.RequestParser()
        parser.add_argument("payment_method", type=str, required=True, help="Payment method is required")
        parser.add_argument("transaction_id", type=str, required=True, help="Transaction ID is required")
        data = parser.parse_args()
        
        if data["payment_method"] not in ["mpesa", "card", "paypal"]:
            return {"error": "Invalid payment method"}, 400
        
        # Check if the transaction ID already exists to avoid duplicates
        existing_payment = Payment.query.filter_by(transaction_id=data["transaction_id"]).first()
        if existing_payment:
            return {"error": "Transaction ID already exists."}, 400
        
        try:
            new_payment = Payment(
                order_id=order_id,
                payment_method=data["payment_method"],
                transaction_id=data["transaction_id"],
                payment_status="successful",
                created_at=datetime.utcnow()
            )
            
            order.status = "paid"  # Update order status
            db.session.add(new_payment)
            db.session.commit()
            
            return {"message": "Payment processed successfully", "payment": {
                "id": new_payment.id,
                "order_id": new_payment.order_id,
                "payment_method": new_payment.payment_method,
                "transaction_id": new_payment.transaction_id,
                "payment_status": new_payment.payment_status,
                "created_at": new_payment.created_at.isoformat()
            }}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class GetPayments(Resource):
    @jwt_required()
    def get(self, order_id):
        user_id = get_jwt_identity()
        order = Order.query.get(order_id)
        
        if not order:
            return {"error": "Order not found"}, 404
        if order.user_id != user_id:
            return {"error": "Unauthorized."}, 403
        
        payments = Payment.query.filter_by(order_id=order_id).all()
        payments_list = [{
            "id": payment.id,
            "order_id": payment.order_id,
            "payment_method": payment.payment_method,
            "transaction_id": payment.transaction_id,
            "payment_status": payment.payment_status,
            "created_at": payment.created_at.isoformat()
        } for payment in payments]
        
        return {"order_id": order_id, "payments": payments_list}, 200
