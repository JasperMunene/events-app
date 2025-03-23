from flask import request, jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from datetime import datetime
from app.database import db
from app.models.models import Event, Ticket  # Ensure Ticket model exists

class AddTickets(Resource):
    @jwt_required()  # Require authentication
    def post(self, event_id):
        """Creates a ticket for a specific event"""
        
        # Ensure event exists
        event = Event.query.get(event_id)
        if not event:
            return {"error": "Event not found"}, 404
        
        # Use reqparse for input validation
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
                available_quantity=data["total_quantity"],  # Initially, all tickets are available
                created_at=datetime.utcnow()
            )

            db.session.add(new_ticket)
            db.session.commit()

            return {
                "message": "Ticket created successfully",
                "ticket": {
                    "id": new_ticket.id,
                    "event_id": new_ticket.event_id,
                    "name": new_ticket.name,
                    "price": new_ticket.price,
                    "total_quantity": new_ticket.total_quantity,
                    "available_quantity": new_ticket.available_quantity,
                    "created_at": new_ticket.created_at
                }
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        

class GetTickets(Resource):
    def get(self, event_id):
        """Fetch all tickets for a specific event"""
        
        # Check if event exists
        event = Event.query.get(event_id)
        if not event:
            return {"error": "Event not found"}, 404

        # Retrieve all tickets for the event
        tickets = Ticket.query.filter_by(event_id=event_id).all()

        # Format the response
        tickets_list = [
            {
                "id": ticket.id,
                "event_id": ticket.event_id,
                "name": ticket.name,
                "price": ticket.price,
                "total_quantity": ticket.total_quantity,
                "available_quantity": ticket.available_quantity,
                "created_at": ticket.created_at
            }
            for ticket in tickets
        ]

        return {"event_id": event_id, "tickets": tickets_list}, 200
