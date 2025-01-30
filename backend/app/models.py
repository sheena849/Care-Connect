from . import db

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))

    # Relationship to Appointment
    appointments = db.relationship('Appointment', backref='user', lazy=True)

    # Many-to-many relationship with Hospital
    hospitals = db.relationship('Hospital', secondary='user_hospital', backref='patients')

# Appointment Model
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(100))
    description = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Hospital Model
class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    location = db.Column(db.String(100))
    services = db.Column(db.String(200))
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "services": self.services
        }

# UserHospital (many-to-many relationship table)
class UserHospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospital.id'), nullable=False)
    status = db.Column(db.String(50))  # A user submittable attribute, e.g., status of the relationship
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # You can add any other relevant fields here

    user = db.relationship('User', backref='patients', lazy=True)
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
        }
