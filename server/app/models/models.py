from app.database import db
from datetime import datetime
from sqlalchemy import CheckConstraint

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True)
    password_hash = db.Column(db.Text, nullable=False)
    user_type = db.Column(db.String(20), nullable=False, default="buyer")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint(user_type.in_(['buyer', 'organizer', 'admin']), name='user_type_check'),
    )
class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255))
    status = db.Column(db.String(20), nullable=False, default="upcoming")
    event_capacity = db.Column(db.Integer, nullable=False, default=0)  # New column

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    organizer = db.relationship("User", backref="events")

    __table_args__ = (
        CheckConstraint(status.in_(['upcoming', 'ongoing', 'completed', 'canceled']), name='event_status_check'),
        CheckConstraint('event_capacity >= 0', name='event_capacity_check'),  # Ensures capacity is non-negative
    )


class Ticket(db.Model):
    __tablename__ = "tickets"
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)  # SQLite does not support Numeric(10,2)
    total_quantity = db.Column(db.Integer, nullable=False)
    available_quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    event = db.relationship("Event", backref="tickets")

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="pending")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="orders")
    event = db.relationship("Event", backref="orders")

    __table_args__ = (
        CheckConstraint(status.in_(['pending', 'paid', 'canceled', 'refunded']), name='order_status_check'),
    )

class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id", ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)

    order = db.relationship("Order", backref="order_items")
    ticket = db.relationship("Ticket", backref="order_items")

class Payment(db.Model):
    __tablename__ = "payments"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    payment_method = db.Column(db.String(20), nullable=False)
    payment_status = db.Column(db.String(20), nullable=False, default="pending")
    transaction_id = db.Column(db.String(255), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    order = db.relationship("Order", backref="payments")

    __table_args__ = (
        CheckConstraint(payment_method.in_(['mpesa', 'card', 'paypal']), name='payment_method_check'),
        CheckConstraint(payment_status.in_(['pending', 'successful', 'failed']), name='payment_status_check'),
    )

class CheckIn(db.Model):
    __tablename__ = "checkins"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id", ondelete="CASCADE"), nullable=False)
    checked_in_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="checkins")
    ticket = db.relationship("Ticket", backref="checkins")
    