from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Patient, Appointment, Hospital, UserHospital
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import logging

# Blueprint instances for different resources
user_bp = Blueprint('user_bp', __name__, url_prefix='/users')
patient_bp = Blueprint('patient_bp', __name__, url_prefix='/patients')
appointment_bp = Blueprint('appointment_bp', __name__, url_prefix='/appointments')
hospital_bp = Blueprint('hospital_bp', __name__, url_prefix='/hospitals')
userhospital_bp = Blueprint('userhospital_bp', __name__, url_prefix='/userhospital')


def validate_data(required_fields, data):
    return all(data.get(field) for field in required_fields)

# -------------------------
# User Routes (Signup, Login, CRUD)
# -------------------------
@user_bp.route('/signup', methods=['POST'])
def signup():
    try:
        # Directly get the parsed JSON
        json_data = request.get_json()
        print(f"Parsed JSON: {json_data}")  # Debugging: Check the parsed JSON
        
        if json_data is None:
            return jsonify({"error": "Invalid JSON data"}), 400
    except Exception as e:
        return jsonify({"error": f"Error parsing JSON: {str(e)}"}), 400

    # Validate the required fields
    if not validate_data(['name', 'email', 'password'], json_data):
        return jsonify({"error": "Missing data"}), 400

    # Check if email already exists
    if User.query.filter_by(email=json_data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password and create a new user
    hashed_password = generate_password_hash(json_data['password'], method='pbkdf2:sha256')
    new_user = User(name=json_data['name'], email=json_data['email'], password=hashed_password)

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not validate_data(['email', 'password'], data):
            return jsonify({"error": "Missing data"}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({"error": "User  not found"}), 404
        
        if not check_password_hash(user.password, data['password']):
            return jsonify({"error": "Authentication failed"}), 401
        
        # Create the token with the user ID as a dictionary
        access_token = create_access_token(identity={"id": user.id}, expires_delta=timedelta(hours=24))
        return jsonify({"message": "Login successful", "token": access_token, "userId": user.id}), 200
    
    except Exception as e:
        logging.error(f"Error occurred during login: {e}")
        return jsonify({"error": "Internal server error"}), 500
@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    user_id = get_jwt_identity()["id"]  # Get user ID from JWT identity
    user = User.query.get_or_404(user_id)
    
    # You can filter based on user permissions if needed (e.g., check if user is an 'admin')
    # However, you should remove the role check since it's not in your database
    users = User.query.all()  # Return all users or filter them as per your requirements
    
    return jsonify([{"id": user.id, "name": user.name, "email": user.email} for user in users])

@user_bp.route('/<int:user_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def modify_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'PUT':
        data = request.get_json()
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        if "password" in data:
            user.password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# -------------------------
# Patient Routes (CRUD)
# -------------------------
@patient_bp.route('/', methods=['POST', 'GET'])
@jwt_required()
def manage_patients():
    if request.method == 'POST':
        data = request.get_json()
        logging.info(f"Received data for new patient: {data}")  # Log the received data

        # Validate the incoming data
        if not data or not data.get('name'):
            logging.error("Patient name is required.")
            return jsonify({"error": "Patient name is required"}), 400

        # Get the user_id from the JWT token
        user_identity = get_jwt_identity()
        logging.info(f"Decoded user_identity: {user_identity}")  # Log the entire user_identity

        # Log the JWT token itself
        logging.info(f"JWT token: {request.headers.get('Authorization')}")

        if isinstance(user_identity, dict) and "id" in user_identity:
            user_id = user_identity["id"]
        else:
            logging.error("Invalid JWT token: user identity is not a dictionary or does not contain 'id'")
            return jsonify({"error": "Invalid token"}), 401

        # Log extracted user_id before using it
        logging.info(f"Extracted user_id: {user_id} (Type: {type(user_id)})")

        try:
            # Create a new patient
            new_patient = Patient(name=data['name'], user_id=user_id)
            db.session.add(new_patient)
            db.session.commit()
            logging.info(f"Patient created successfully: {new_patient.to_dict()}")
            return jsonify({"message": "Patient created successfully", "patient": new_patient.to_dict()}), 201
        except Exception as e:
            logging.error(f"Error adding patient: {e}", exc_info=True)  # Log the full traceback
            return jsonify({"error": "An error occurred while adding the patient."}), 500

    # Handle GET request to list all patients
    try:
        patients = Patient.query.all()
        return jsonify([patient.to_dict() for patient in patients]), 200
    except Exception as e:
        logging.error(f"Error fetching patients: {str(e)}", exc_info=True)  # Log the full traceback
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@patient_bp.route('/<int:patient_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def patient_operations(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    if request.method == 'GET':
        return jsonify(patient.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        if 'name' not in data or not data['name']:
            return jsonify({"error": "Patient name is required"}), 400
        patient.name = data['name']
        db.session.commit()
        return jsonify({"message": "Patient updated successfully", "patient": patient.to_dict()}), 200
    
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted successfully"}), 200

# -------------------------
# Appointment Routes (CRUD)
@appointment_bp.route('/', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()

    # Update validation to match the actual fields in your model
    if not validate_data(['date', 'user_id', 'description'], data):
        return jsonify({"error": "Missing data"}), 400

    # Create the new appointment with the correct fields
    new_appointment = Appointment(
        date=data['date'],
        user_id=data['user_id'],  # ensure user_id is passed in the request
        description=data['description']  # assuming 'description' is the field name
    )

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment created successfully", "appointment": new_appointment.to_dict()}), 201

# -------------------------
# Get Appointments by User
# -------------------------
@appointment_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_appointments(user_id):
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": a.id,
        "date": a.date,
        "description": a.description,  # Match this with your model field
        "user_id": a.user_id  # Add user_id as per your model
    } for a in appointments])


# -------------------------
# Get Appointments by Patient
# -------------------------
@appointment_bp.route('/patient/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    return jsonify([{
        "id": a.id,
        "date": a.date,
        "description": a.description,  # Updated to match your model field
        "user_id": a.user_id  # Added user_id
    } for a in appointments])


# -------------------------
# Update or Delete Appointment
# -------------------------
@appointment_bp.route('/<int:appointment_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def appointment_operations(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    
    if request.method == 'PUT':
        data = request.get_json()
        appointment.date = data.get('date', appointment.date)
        appointment.description = data.get('description', appointment.description)  # Updated to description
        db.session.commit()
        return jsonify({"message": "Appointment updated successfully"}), 200
    
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted successfully"}), 200

@hospital_bp.route('/', methods=['POST', 'GET'])
@jwt_required()
def manage_hospitals():
    if request.method == 'POST':
        data = request.get_json()
        print(f"Received data: {data}")  # Log the incoming data

        if not data.get('name'):
            return jsonify({"error": "Hospital name is required"}), 400

        new_hospital = Hospital(
            name=data['name'],
            location=data.get('location'),
            services=data.get('services')
        )
        db.session.add(new_hospital)
        db.session.commit()

        return jsonify({"message": "Hospital created successfully", "hospital": new_hospital.to_dict()}), 201

    hospitals = Hospital.query.all()
    return jsonify([hospital.to_dict() for hospital in hospitals])


@hospital_bp.route('/<int:hospital_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def hospital_operations(hospital_id):
    hospital = Hospital.query.get_or_404(hospital_id)
    if request.method == 'GET':
        return jsonify(hospital.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        hospital.name = data.get('name', hospital.name)
        hospital.location = data.get('location', hospital.location)
        hospital.services = data.get('services', hospital.services)
        db.session.commit()
        return jsonify({"message": "Hospital updated successfully", "hospital": hospital.to_dict()}), 200
    
    db.session.delete(hospital)
    db.session.commit()
    return jsonify({"message": "Hospital deleted successfully"}), 200

@userhospital_bp.route('/', methods=['POST'])
@jwt_required()
def create_user_hospital():
    data = request.get_json()

    # Check if the required fields (user_id, hospital_id) are provided
    if not data.get('user_id') or not data.get('hospital_id'):
        return jsonify({"error": "User ID and Hospital ID are required"}), 400

    # Create new UserHospital entry
    new_user_hospital = UserHospital(
        user_id=data['user_id'],
        hospital_id=data['hospital_id'],
        status=data.get('status')  # Optional field
    )

    db.session.add(new_user_hospital)
    db.session.commit()

    return jsonify({
        "message": "User-Hospital relationship created successfully",
        "user_hospital": {
            "id": new_user_hospital.id,
            "user_id": new_user_hospital.user_id,
            "hospital_id": new_user_hospital.hospital_id,
            "status": new_user_hospital.status
        }
    }), 201

@userhospital_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_hospitals(user_id):
    try:
        logging.info(f"Fetching hospitals for user_id: {user_id}")
        user_hospitals = UserHospital.query.filter_by(user_id=user_id).all()

        if not user_hospitals:
            logging.warning(f"No hospitals found for user_id: {user_id}")
            return jsonify({"message": "No hospitals found for this user."}), 404

        return jsonify([{
            "id": uh.id,
            "user_id": uh.user_id,
            "hospital_id": uh.hospital_id,
            "status": uh.status
        } for uh in user_hospitals])
    except Exception as e:
        logging.error(f"Error fetching user hospitals for user_id {user_id}: {e}")
        return jsonify({"error": "An error occurred while fetching user hospitals."}), 500
@userhospital_bp.route('/hospital/<int:hospital_id>', methods=['GET'])
@jwt_required()
def get_hospital_users(hospital_id):
    # Get all UserHospital records related to a specific hospital
    hospital_users = UserHospital.query.filter_by(hospital_id=hospital_id).all()

    return jsonify([{
        "id": uh.id,
        "user_id": uh.user_id,
        "hospital_id": uh.hospital_id,
        "status": uh.status
    } for uh in hospital_users])
@userhospital_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_user_hospital(id):
    data = request.get_json()

    # Get the relationship to update
    user_hospital = UserHospital.query.get_or_404(id)

    # Update the status if provided
    user_hospital.status = data.get('status', user_hospital.status)

    db.session.commit()

    return jsonify({
        "message": "User-Hospital relationship updated successfully",
        "user_hospital": {
            "id": user_hospital.id,
            "user_id": user_hospital.user_id,
            "hospital_id": user_hospital.hospital_id,
            "status": user_hospital.status
        }
    }), 200
@userhospital_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user_hospital(id):
    # Get the relationship to delete
    user_hospital = UserHospital.query.get_or_404(id)

    db.session.delete(user_hospital)
    db.session.commit()

    return jsonify({"message": "User-Hospital relationship deleted successfully"}), 200