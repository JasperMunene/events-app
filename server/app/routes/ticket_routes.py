from flask import request, jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.database import db
from app.models.models import Event, Ticket  # Ensure models exist

class AddTickets(Resource):
    @jwt_required()
    def post(self, event_id):
        user_id = get_jwt_identity()
        event = Event.query.get(event_id)
        if not event:
            return {"error": "Event not found"}, 404
        if event.organizer_id != user_id:
            return {"error": "Unauthorized. Only the event organizer can add tickets."}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True, help="Ticket name is required")
        parser.add_argument("price", type=float, required=True, help="Ticket price is required")
        parser.add_argument("total_quantity", type=int, required=True, help="Total quantity is required")
        
        data = parser.parse_args()

        try:
            new_ticket = Ticket(
                event_id=event_id,
                name=data["name"],
                price=data["price"],
                total_quantity=data["total_quantity"],
                available_quantity=data["total_quantity"],
                created_at=datetime.utcnow()
            )
            db.session.add(new_ticket)
            db.session.commit()

            return {"message": "Ticket created successfully", "ticket": {
                "id": new_ticket.id,
                "event_id": new_ticket.event_id,
                "name": new_ticket.name,
                "price": new_ticket.price,
                "total_quantity": new_ticket.total_quantity,
                "available_quantity": new_ticket.available_quantity,
                "created_at": new_ticket.created_at.isoformat()
            }}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class GetTickets(Resource):
    def get(self, event_id):
        event = Event.query.get(event_id)
        if not event:
            return {"error": "Event not found"}, 404
        tickets = Ticket.query.filter_by(event_id=event_id).all()
        tickets_list = [{
            "id": ticket.id,
            "event_id": ticket.event_id,
            "name": ticket.name,
            "price": ticket.price,
            "total_quantity": ticket.total_quantity,
            "available_quantity": ticket.available_quantity,
            "created_at": ticket.created_at.isoformat()
        } for ticket in tickets]
        return {"event_id": event_id, "tickets": tickets_list}, 200

class EditTicket(Resource):
    @jwt_required()
    def put(self, ticket_id):
        user_id = get_jwt_identity()
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return {"error": "Ticket not found"}, 404
        event = Event.query.get(ticket.event_id)
        if event.organizer_id != user_id:
            return {"error": "Unauthorized. Only the event organizer can edit tickets."}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str)
        parser.add_argument("price", type=float)
        parser.add_argument("total_quantity", type=int)
        
        data = parser.parse_args()
        if data["name"]:
            ticket.name = data["name"]
        if data["price"]:
            ticket.price = data["price"]
        if data["total_quantity"]:
            ticket.total_quantity = data["total_quantity"]
            ticket.available_quantity = data["total_quantity"]

        db.session.commit()
        return {"message": "Ticket updated successfully", "ticket": {
            "id": ticket.id,
            "event_id": ticket.event_id,
            "name": ticket.name,
            "price": ticket.price,
            "total_quantity": ticket.total_quantity,
            "available_quantity": ticket.available_quantity,
            "created_at": ticket.created_at.isoformat()
        }}, 200

class DeleteTicket(Resource):
    @jwt_required()
    def delete(self, ticket_id):
        user_id = get_jwt_identity()
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return {"error": "Ticket not found"}, 404
        event = Event.query.get(ticket.event_id)
        if event.organizer_id != user_id:
            return {"error": "Unauthorized. Only the event organizer can delete tickets."}, 403

        db.session.delete(ticket)
        db.session.commit()
        return {"message": "Ticket deleted successfully"}, 200
