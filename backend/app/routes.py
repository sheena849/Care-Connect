from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Patient, Appointment

main = Blueprint('main', __name__)

# Create User (Doctor or Patient)
@main.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not all([name, email, password, role]):
        return jsonify({"error": "Missing data"}), 400
    
    new_user = User(name=name, email=email, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

# Get All Users
@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "name": user.name, "email": user.email, "role": user.role} for user in users])

# Create Appointment
@main.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    date = data.get('date')
    patient_id = data.get('patient_id')
    user_id = data.get('user_id')
    status = data.get('status')

    if not all([date, patient_id, user_id, status]):
        return jsonify({"error": "Missing data"}), 400
    
    new_appointment = Appointment(date=date, patient_id=patient_id, user_id=user_id, status=status)
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({"message": "Appointment created successfully"}), 201

# Get Appointments for a User (Doctor)
@main.route('/appointments/<int:user_id>', methods=['GET'])
def get_appointments(user_id):
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": appointment.id, "date": appointment.date, "status": appointment.status} for appointment in appointments])

# Get Appointments for a Patient
@main.route('/appointments/patient/<int:patient_id>', methods=['GET'])
def get_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    return jsonify([{"id": appointment.id, "date": appointment.date, "status": appointment.status} for appointment in appointments])
