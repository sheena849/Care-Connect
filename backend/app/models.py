from app import db

# User model (can be for both patients and doctors)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))  # Use proper encryption for passwords
    role = db.Column(db.String(50))  # 'doctor' or 'patient'
    appointments = db.relationship('Appointment', backref='user', lazy=True)

    def __repr__(self):
        return f"User({self.name}, {self.email}, {self.role})"
    
    # Convert to dictionary to see JSON representation
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'appointments': [appointment.to_dict() for appointment in self.appointments]
        }


# Patient model (can still exist for patient-specific details if needed)
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    appointments = db.relationship('Appointment', backref='patient', lazy=True)

    def __repr__(self):
        return f"Patient({self.name})"

    # Convert to dictionary to see JSON representation
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'appointments': [appointment.to_dict() for appointment in self.appointments]
        }


# Appointment model (many-to-many relationship with User and Patient)
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))  # Date of the appointment
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Reciprocal many-to-many relationship with extra attribute
    status = db.Column(db.String(50))  # User-submittable attribute for the many-to-many relationship

    def __repr__(self):
        return f"Appointment({self.date}, {self.status})"

    # Convert to dictionary to see JSON representation
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'status': self.status,
            'patient_id': self.patient_id,
            'user_id': self.user_id
        }
