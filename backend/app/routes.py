from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Patient, Appointment
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta 
main = Blueprint('main', __name__)

# -------------------------
# User Routes (Signup, Login, CRUD)
# -------------------------

# Create User (Signup)
@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    # Validate data
    if not all([name, email, password, role]):
        return jsonify({"error": "Missing data"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # Updated password hashing method
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(name=name, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201
@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if both email and password are provided
    if not all([email, password]):
        return jsonify({"error": "Missing data"}), 400

    # Query the user by email
    user = User.query.filter_by(email=email).first()

    # If the user is not found, return a generic error
    if not user:
        print(f"User with email {email} not found.")  # Debugging log
        return jsonify({"error": "Authentication failed"}), 401

    # Check if the password matches
    if not check_password_hash(user.password, password):
        print(f"Password mismatch for email: {email}")  # Debugging log
        return jsonify({"error": "Authentication failed"}), 401

    # If user exists and password is correct, generate access token
    access_token = create_access_token(identity={"id": user.id, "role": user.role}, expires_delta=timedelta(hours=24))
    return jsonify({"message": "Login successful", "token": access_token}), 200


# Get All Users (Admins or Doctors)
@main.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":  # Optional role-based restriction
        return jsonify({"error": "Unauthorized"}), 403

    users = User.query.all()
    return jsonify([{"id": user.id, "name": user.name, "email": user.email, "role": user.role} for user in users])

# Update User
@main.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    
    if "password" in data:
        # Change hashing method to 'pbkdf2:sha256'
        user.password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        
    user.role = data.get('role', user.role)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# Delete User
@main.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# -------------------------
# Appointment Routes (CRUD)
# -------------------------

# Create Appointment
@main.route('/appointments', methods=['POST'])
@jwt_required()
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

#@main.route('/appointments/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_appointments(user_id):
    print(f"Fetching appointments for user_id: {user_id}")  # Debugging log
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    if not appointments:
        print(f"No appointments found for user_id: {user_id}")  # Debugging log
    return jsonify([{"id": a.id, "date": a.date, "status": a.status, "patient_id": a.patient_id} for a in appointments])

# Get All Appointments (For a Patient)
@main.route('/appointments/patient/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    return jsonify([{"id": a.id, "date": a.date, "status": a.status, "user_id": a.user_id} for a in appointments])

# Update Appointment
@main.route('/appointments/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    data = request.get_json()
    appointment = Appointment.query.get_or_404(appointment_id)

    appointment.date = data.get('date', appointment.date)
    appointment.status = data.get('status', appointment.status)
    db.session.commit()
    return jsonify({"message": "Appointment updated successfully"}), 200

# Delete Appointment
@main.route('/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted successfully"}), 200


# Create Patient
@main.route('/patients', methods=['POST'])
@jwt_required()
def create_patient():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "Missing patient name"}), 400

    new_patient = Patient(name=name)
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({"message": "Patient created successfully", "patient": new_patient.to_dict()}), 201

# Get All Patients
@main.route('/patients', methods=['GET'])
@jwt_required()
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_dict() for patient in patients])

# Get Patient by ID
@main.route('/patients/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify(patient.to_dict())

@main.route('/patients/<int:patient_id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_id):
    data = request.get_json()

    # Ensure that the name is provided
    if 'name' not in data or not data['name']:
        return jsonify({"error": "Patient name is required"}), 400

    # Get the patient from the database
    patient = Patient.query.get_or_404(patient_id)

    # Update the patient's name
    patient.name = data['name']
    
    db.session.commit()

    return jsonify({
        "message": "Patient updated successfully",
        "patient": patient.to_dict()
    }), 200


# Delete Patient
@main.route('/patients/<int:patient_id>', methods=['DELETE'])
@jwt_required()
def delete_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted successfully"}), 200