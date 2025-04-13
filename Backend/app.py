#Luke Chayer 30207980
#Hewan Gebremedhin 30208792

from flask import Flask, request, jsonify
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
# Student Registration API 
@app.route('/register', methods=['POST'])
def register():
    payload = request.get_json()
    print(payload)
    username = payload.get('username')
    password = payload.get('password')
    email = payload.get('email')
    

    if not username or not password or not email:
        return jsonify({"success": False, "message": "Missing required fields."}), 400

    if any(student['Username'] == username for student in students):
        return jsonify({"success": False, "message": "Username is already taken."}), 409
    
    new_student = {
        "ID": len(students) + 1,
        "Username": username,
        "Password": password,
        "Email": email,
        "Enrolled_courses": []
    }
    students.append(new_student)
    print(students)
    return jsonify({"success": True, "message": "Registration successful."}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    for student in students:
        if student['Username'] == data['username'] and student['Password'] == data['password']:
            return {"success": True,'message': 'Login successful! Redirecting...', 'student': student['ID']}
    
    return {"success": False,'message': 'Error: Invalid username or password'}

@app.route('/testimonials', methods=['GET'])
def testimonials():
    return testimonials_data
    
@app.route('/enroll/<student_id>', methods=['POST'])
def enrollStudent(student_id):
    data = request.get_json()
    course = data['course']
    student = next((x for x in students if x['ID'] == int(student_id)), None)
    if not student:
        return {'success': False, 'message': 'Student not found'}, 404

    if course in student['Enrolled_courses']:
        return {'success': False, 'message': 'Already enrolled in this course'}, 400

    student['Enrolled_courses'].append(course)
    return {'success': True, 'message': 'Enrolled successfully'}, 200




# Delete Courses API 

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get('course_id')
    if not course_id:
        return jsonify({"success": False, "message": "No course ID provided."}), 400
    student = next((stud for stud in students if stud['ID'] == student_id), None)
    if not student:
        return jsonify({"success": False, "message": "Student not found. Please log in."}), 404
    student['Enrolled_courses'] = [course for course in student['Enrolled_courses'] if course["id"] != course_id]
    return jsonify({"success": True, "message": "Course dropped successfully!"}), 200


# Retrieve All Courses API (GET /courses)
@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data), 200

@app.route('/student_courses/<student_id>', methods=['GET'])
def get_student_courses(student_id):
    student = next((stud for stud in students if stud['ID'] == int(student_id)), None)
    if not student:
        return jsonify([]), 404

    enrolled_courses = student['Enrolled_courses']
    return jsonify(enrolled_courses), 200


@app.route('/')
def index():
    return "LMS Backend is operational!"

if __name__ == '__main__':
    app.run(debug=True)