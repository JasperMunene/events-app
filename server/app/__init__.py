from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from app.database import db
from app.routes.auth_routes import Register, Login, Profile
from app.routes.event_routes import Addevent, GetEvents, GetEvent
from app.routes.ticket_routes import AddTickets, GetTickets, DeleteTicket, EditTicket
from app.routes.order_routes import CreateOrder, GetUserOrders, UpdateOrderStatus
from app.routes.payment_routes import ProcessPayment, GetPayments
from flask_cors import CORS
from datetime import timedelta


def create_app():
    app = Flask(__name__)
    # Database configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///events.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "your_secret_key"
    app.config['SECRET_KEY'] = 'your_strong_secret_key'
    app.config["JWT_SECRET_KEY"] = 'your_jwt_secret_key'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    jwt = JWTManager(app)
    # Initialize Flask-RESTful API
    api = Api(app)
    CORS(app)
    
    # Define a RESTful resource
    from flask_restful import Resource

    class HomeResource(Resource):
        def get(self):
            return {"message": "Ha! gatcha!!!!! We're changing the world... join us and build the future, submit your resume @ careers@bytesmile.dev"}, 200

    # Register API Endpoints
    # auth routes
    api.add_resource(HomeResource, "/")
    api.add_resource(Register, "/auth/register")
    api.add_resource(Login, "/auth/login")
    api.add_resource(Profile, "/profile")
    
    # event management routes
    api.add_resource(Addevent, '/event/add')
    api.add_resource(GetEvents, '/events/get')
    api.add_resource(GetEvent, '/event/<int:event_id>')
    api.add_resource(AddTickets, "/event/<int:event_id>/add_ticket")
    api.add_resource(GetTickets, "/event/<int:event_id>/get_tickets")
    
    # ticket management routes
    api.add_resource(EditTicket, "/ticket/<int:ticket_id>/edit")
    api.add_resource(DeleteTicket, "/ticket/<int:ticket_id>/delete")
    
    # order management routes
    api.add_resource(CreateOrder, "/orders/new")
    api.add_resource(GetUserOrders, "/orders/get")
    api.add_resource(UpdateOrderStatus, "/orders/<int:order_id>/update")
    
    # payment management routes
    api.add_resource(ProcessPayment, "/payment/<int:order_id>/pay")
    api.add_resource(GetPayments, "/payment/<int:order_id>/get")
    return app
