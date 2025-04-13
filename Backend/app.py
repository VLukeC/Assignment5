#Luke Chayer 30207980
#Hewan Gebremedhin 30208792

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import os

app = Flask(__name__)
CORS(app)

try:
    testimonials_file = os.path.join(os.path.dirname(__file__), 'testimonials.json')
    with open(testimonials_file, 'r') as tf:
        testimonials_data = json.load(tf)
except Exception as error:
    testimonials_data = []
    print("Error loading testimonials.json:", error)

try:
    courses_file = os.path.join(os.path.dirname(__file__), 'courses.json')
    with open(courses_file, 'r') as cf:
        courses_data = json.load(cf)
except Exception as error:
    courses_data = []
    print("Error loading courses.json:", error)

students = []

# Student Registration API 
@app.route('/register', methods=['POST'])
def register():
    payload = request.get_json()
    username = payload.get('username')
    password = payload.get('password')
    email = payload.get('email')
    

    if not username or not password or not email:
        return jsonify({"success": False, "message": "Missing required fields."}), 400

    if any(student['username'] == username for student in students):
        return jsonify({"success": False, "message": "Username is already taken."}), 409
    
    id_new = students[-1]['id'] + 1 if students else 1
    new_student = {
        "id": id_new,
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
    }
    students.append(new_student)
    return jsonify({"success": True, "message": "Registration successful."}), 201

# Login API 
@app.route('/login', methods=['POST'])
def login():
    credentials = request.get_json()
    username = credentials.get('username')
    password = credentials.get('password')
    
    if not username or not password:
        return jsonify({"success": False, "message": "Missing username or password."}), 400
    
    student = next((stud for stud in students if stud['username'] == username and stud['password'] == password), None)
    if student:
        return jsonify({"success": True, "message": "Login successful.", "student_id": student['id']}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials."}), 401

# Testimonials API 
@app.route('/testimonials', methods=['GET'])
def testimonials_endpoint():
    if not testimonials_data:
        return jsonify({"success": False, "message": "No testimonials available."}), 404
    selected = testimonials_data if len(testimonials_data) < 2 else random.sample(testimonials_data, 2)
    return jsonify(selected), 200

# Enroll Courses API 
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course_info = data.get('course')
    if not course_info:
        return jsonify({"success": False, "message": "No course provided."}), 400
    
    student = next((stud for stud in students if stud['id'] == student_id), None)
    if not student:
        return jsonify({"success": False, "message": "Student not found. Please sign up or log in."}), 404

    existing_course = next((c for c in student['enrolled_courses'] if c.get('id') == course_info.get('id')), None)
    if existing_course:
        existing_course['count'] = existing_course.get('count', 1) + 1
    else:
        course_to_add = course_info.copy()
        course_to_add['count'] = 1
        student['enrolled_courses'].append(course_to_add)
    
    return jsonify({"success": True, "message": "Course enrollment successful!"}), 200


# Delete Courses API 

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_info = data.get('course')
    if not course_info:
        return jsonify({"success": False, "message": "No course provided."}), 400
    
    course_id = course_info.get('id')
    if not course_id:
        return jsonify({"success": False, "message": "Course ID is missing."}), 400
    
    student = next((stud for stud in students if stud['id'] == student_id), None)
    if not student:
        return jsonify({"success": False, "message": "Student not found. Please log in."}), 404
    
    enrolled_course = next((c for c in student['enrolled_courses'] if c.get('id') == course_id), None)
    if not enrolled_course:
        return jsonify({"success": False, "message": "Course not found in enrolled courses."}), 404
    
    if enrolled_course.get('count', 1) > 1:
        enrolled_course['count'] -= 1
    else:
        student['enrolled_courses'].remove(enrolled_course)
    
    return jsonify({"success": True, "message": "Course dropped successfully!"}), 200


# Retrieve All Courses API (GET /courses)
@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data), 200

# Student's Courses API 
@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    student = next((stud for stud in students if stud['id'] == student_id), None)
    if not student:
        return jsonify([]), 404
    return jsonify(student.get('enrolled_courses', [])), 200

@app.route('/')
def index():
    return "LMS Backend is operational!"

if __name__ == '__main__':
    app.run(debug=True)