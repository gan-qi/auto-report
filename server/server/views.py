# -*- coding: utf-8 -*-
from flask import request

from server import app, db
from server.models import USER, TASK, LOG, MAILCONFIG

from flask_restful import Resource, Api, reqparse
from datetime import datetime
from pprint import pprint

api = Api(app)


username = 'tom'
userId = 1

class optionTask(Resource):
    """获取任务列表和新增
    """

    def option(self):
        return {
                'code': 20000
                }

    def get(self):
        currentTime = datetime.now().strftime('%Y-%m-%d')
        tasks = TASK.query.filter_by(ownerId=userId).all()
        taskList = [
                dict(
                    id=item.id,
                    title=item.title,
                    status=item.status,
                    time=item.time.strftime("%Y-%m-%d"),
                    edit=False
                    )
                    for item in tasks
                ]
        return {
                    'code': 20000,
                    'data': taskList
                }

    def post(self):
        """新增任务

        data: {
            'title': 'xxx',
        }
        """
        data = request.get_json(force=True)
        newTask = TASK(title=data.get('title'), ownerId=1)
        db.session.add(newTask)
        db.session.commit()
        return {
                    'code': 20000
                }

class optionOneTask(Resource):
    """对单个任务进行删除和修改
    """

    def option(self):
        return {
                    'code': 20000
                }

    def delete(self, taskid):
        targetTask = TASK.query.filter_by(id=taskid).first()
        db.session.delete(targetTask)
        db.session.commit()
        return {
                    'code': 20000
                }

    def post(self, taskid):
        """修改任务

        data: {
            'id': 1,
            'title': 'xxx',
            'status': True
        }
        """
        data = request.get_json(force=True)
        newTask = TASK.query.filter_by(id=taskid).first()
        newTask.title = data.get('title')
        newTask.status = data.get('status')
        db.session.commit()
        return {
                    'code': 20000
                }

api.add_resource(optionTask, '/task')
api.add_resource(optionOneTask, '/task/<int:taskid>')
