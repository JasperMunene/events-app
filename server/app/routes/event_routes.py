from flask import request, jsonify
from flask_restful import Resource, reqparse
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.database import db
from app.models.models import User, Event, Ticket

class Addevent(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user or user.user_type != "organizer":
            return {"message": "Unauthorized. Only organizers can add events."}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True, help="Event name is required")
        parser.add_argument("description", type=str, required=False)
        parser.add_argument("location", type=str, required=True, help="Location is required")
        parser.add_argument("date", type=str, required=True, help="Date is required (YYYY-MM-DD HH:MM:SS)")
        parser.add_argument("event_capacity", type=int, required=True, help="Capacity is required")
        parser.add_argument("poster_url", type=str, required=True, help="Poster Image is required")
        args = parser.parse_args()

        try:
            event_date = datetime.strptime(args["date"], "%Y-%m-%d %H:%M:%S")
            if event_date < datetime.utcnow():
                return {"message": "Event date must be in the future."}, 400
        except ValueError:
            return {"message": "Invalid date format. Use YYYY-MM-DD HH:MM:SS."}, 400

        if args["event_capacity"] < 0:
            return {"message": "Event capacity must be zero or more."}, 400

        new_event = Event(
            name=args["name"],
            description=args.get("description", ""),
            location=args["location"],
            date=event_date,
            event_capacity=args["event_capacity"],
            poster_url=args["poster_url"],
            organizer_id=user_id
        )

        try:
            db.session.add(new_event)
            db.session.commit()
            return {"message": "Event added successfully", "event_id": new_event.id}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": "Error adding event", "error": str(e)}, 500
        
def apply_filters(query, search, location, date):
    if search:
        query = query.filter(Event.name.ilike(f"%{search}%") | Event.description.ilike(f"%{search}%"))
    if location:
        query = query.filter(Event.location.ilike(f"%{location}%"))
    if date:
        try:
            event_date = datetime.strptime(date, "%Y-%m-%d")
            query = query.filter(Event.date >= event_date)
        except ValueError:
            pass  # Ignore invalid date format
    return query

class GetEvents(Resource):
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)
        search = request.args.get("search", type=str)
        location = request.args.get("location", type=str)
        date = request.args.get("date", type=str)

        # Apply filters
        query = Event.query
        query = apply_filters(query, search, location, date)

        events_pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        if page > events_pagination.pages and events_pagination.pages > 0:
            page = 1
            events_pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        events_list = []
        for event in events_pagination.items:
            tickets = Ticket.query.filter_by(event_id=event.id).all()
            tickets_list = [
                {
                    "id": ticket.id,
                    "event_id": ticket.event_id,
                    "name": ticket.name,
                    "price": ticket.price,
                    "total_quantity": ticket.total_quantity,
                    "available_quantity": ticket.available_quantity,
                    "created_at": ticket.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                }
                for ticket in tickets
            ]

            events_list.append({
                "id": event.id,
                "name": event.name,
                "description": event.description,
                "location": event.location,
                "date": event.date.strftime("%Y-%m-%d %H:%M:%S"),
                "status": event.status,
                "event_capacity": event.event_capacity,
                "poster_url": event.poster_url,
                "organizer_id": event.organizer_id,
                "tickets": tickets_list,
            })

        return {
            "events": events_list,
            "total_events": events_pagination.total,
            "page": events_pagination.page,
            "per_page": events_pagination.per_page,
            "total_pages": events_pagination.pages,
            "has_next": events_pagination.has_next,
            "has_prev": events_pagination.has_prev,
        }, 200
