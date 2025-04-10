from flask import Flask, request
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)
testimonials = './Backend/testimonials.json'
with open(testimonials) as file:
    testimonials_data = json.load(file)

courses = './Backend/courses.json'
with open(courses) as file:
    courses_data = json.load(file)

students = [
    {'ID': 1, 'Username': 'student1', 'Password': 'password1'
     , 'Email' : 'email@email.com', 
     'Enrolled_courses' : []},
]
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if the username already exists
    for student in students:
        if student['Username'] == data['username']:
            return {'message': 'Username is already taken'}
        
    students.append({
        'ID': len(students) + 1,
        'Username': data['username'],
        'Password': data['password'],
        'Email': data['email'],
        'Enrolled_courses': []
    })

    return {'message': 'Registration successful'}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    for student in students:
        if student['Username'] == data['username'] and student['Password'] == data['password']:
            return {'result' : 'success','message': 'Login successful! Redirecting...', 'student': student['ID']}
    
    return {'message': 'Error: Invalid username or password'}

@app.route('/testimonials', methods=['GET'])
def testimonials():
    return testimonials_data
    
@app.route('/enroll/<student_id>', methods=['POST'])
def enrollStudent(student_id):
    data = request.get_json()
    courses = data['courses']

    student = (x for x in students if x['ID'] == int(student_id))
    if not student:
        return {'message': 'Student not found'}
    if (x for x in student['Enrolled_courses'] if x in courses):
        return {'message': 'Already enrolled in a course'}
    int(student_id)['Enrolled_courses'].extend(courses)
    return {'message': 'Enrolled successfully'}

@app.route('/drop/<student_id>', methods=['DELETE'])
def dropStudent(student_id):
    return {'message': 'unfinished'}

@app.route('/courses', methods=['GET'])
def getAllCourses():
    return courses_data

@app.route('/student_courses/<student_id>', methods=['GET'])
def getStudentCourses(student_id):
    return {'message': 'unfinished'}


if __name__ == '__main__':
    app.run()