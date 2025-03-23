from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps
from app.database import db
from app.models.models import User

# Auth Resource
class Register(Resource):
    def post(self):
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")
        user_type = data.get("user_type", "buyer")  # Default to 'buyer'

        if not name or not email or not password:
            return {"message": "Name, email, and password are required!"}, 400

        if User.query.filter_by(email=email).first():
            return {"message": "Email already exists!"}, 409

        hashed_password = generate_password_hash(password)

        new_user = User(
            name=name,
            email=email,
            phone=phone,
            password_hash=hashed_password,
            user_type=user_type
        )

        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully!"}, 201


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password_hash, password):
            return {"message": "Invalid email or password!"}, 401

        # Create JWT Token
        token = create_access_token(identity=user.id)
        # Convert nbytes to string for JSON serialization
        if isinstance(token, bytes):
            token = token.decode('utf-8')
        return {"token": token, "user": {"id": user.id, "email": user.email, "user_type": user.user_type}}, 200


class Profile(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            if not user_id:
                return {"message": "Invalid token, user ID not found."}, 401

            current_user = User.query.filter_by(id=user_id).first()

            if not current_user:
                return {"message": "User not found!"}, 404  

            return {
                "id": current_user.id,
                "name": current_user.name,
                "email": current_user.email,
                "phone": current_user.phone,
                "user_type": current_user.user_type
            }, 200

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500
