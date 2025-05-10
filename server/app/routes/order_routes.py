from flask import request, jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.database import db
from app.models.models import Order, OrderItem, Event, Ticket

class CreateOrder(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument("event_id", type=int, required=True, help="Event ID is required")
        parser.add_argument("items", type=dict, action='append', required=True, help="Items are required")
        data = parser.parse_args()

        event = Event.query.get(data["event_id"])
        if not event:
            return {"error": "Event not found"}, 404

        total_amount = 0
        order_items = []

        for item in data["items"]:
            ticket = Ticket.query.get(item["ticket_id"])
            if not ticket:
                return {"error": f"Ticket ID {item['ticket_id']} not found"}, 404
            if ticket.available_quantity < item["quantity"]:
                return {"error": f"Not enough tickets available for {ticket.name}"}, 400
            
            subtotal = ticket.price * item["quantity"]
            total_amount += subtotal
            order_items.append((ticket, item["quantity"], subtotal))

        new_order = Order(
            user_id=user_id,
            event_id=data["event_id"],
            total_amount=total_amount,
            status="pending",
            created_at=datetime.utcnow()
        )
        db.session.add(new_order)
        db.session.flush()

        for ticket, quantity, subtotal in order_items:
            order_item = OrderItem(
                order_id=new_order.id,
                ticket_id=ticket.id,
                quantity=quantity,
                subtotal=subtotal
            )
            ticket.available_quantity -= quantity
            db.session.add(order_item)

        db.session.commit()
        return {"message": "Order created successfully", "order_id": new_order.id}, 201

class GetUserOrders(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        orders = Order.query.filter_by(user_id=user_id).all()
        orders_list = []
        
        for order in orders:
            items = OrderItem.query.filter_by(order_id=order.id).all()
            order_items = [{
                "ticket_id": item.ticket_id,
                "quantity": item.quantity,
                "subtotal": item.subtotal
            } for item in items]

            orders_list.append({
                "id": order.id,
                "event_id": order.event_id,
                "total_amount": order.total_amount,
                "status": order.status,
                "created_at": order.created_at.isoformat(),
                "items": order_items
            })
        
        return {"orders": orders_list}, 200

class UpdateOrderStatus(Resource):
    @jwt_required()
    def put(self, order_id):
        user_id = get_jwt_identity()
        order = Order.query.get(order_id)
        if not order:
            return {"error": "Order not found"}, 404

        event = Event.query.get(order.event_id)
        if event.organizer_id != user_id:
            return {"error": "Unauthorized. Only the event organizer can update order status."}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("status", type=str, required=True, help="Status is required")
        data = parser.parse_args()

        if data["status"] not in ["pending", "paid", "canceled", "refunded"]:
            return {"error": "Invalid status"}, 400

        order.status = data["status"]
        db.session.commit()
        return {"message": "Order status updated successfully"}, 200
