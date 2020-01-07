# -*- coding: utf-8 -*-
from server import db
from datetime import datetime


class USER(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(30), nullable=False)

class TASK(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    ownerId = db.Column(db.Integer, db.ForeignKey('user.id'))

    owner = db.relationship('USER', backref=db.backref('tasks'))

class LOG(db.Model):
    __tablename__ = 'log'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(100), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey('user.id'))

    owner = db.relationship('USER', backref=db.backref('logs'))

class MAILCONFIG(db.Model):
    __tablename__ = 'mailconfig'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fromUSER = db.Column(db.String(10), nullable=False)
    toUSER = db.Column(db.String(10), nullable=False)
    fromEmail = db.Column(db.String(50), nullable=False)
    mailKey = db.Column(db.String(30), nullable=False)
    toEmail = db.Column(db.String(50), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey('user.id'))

    owner = db.relationship('USER', backref=db.backref('mailconfigs'))

