from app import db
from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    email = fields.Str()
    role = fields.Str()

class AppointmentSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Str()
    status = fields.Str()
