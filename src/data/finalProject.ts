export interface ProjectStep {
  stepNumber: number;
  title: string;
  goal: string;
  conceptsUsed: string[];
  folderStructure?: string;
  codeSnippet: {
    filename: string;
    language: 'python' | 'html' | 'bash';
    code: string;
  };
  explanation: string[];
  runInstructions: string;
  expectedResult: string;
  expansionTasks: string[];
}

export interface FinalProjectData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  steps: ProjectStep[];
}

export const FINAL_PROJECT: FinalProjectData = {
  title: 'FLASK STUDENT MANAGEMENT SYSTEM',
  subtitle: 'Hệ thống Quản lý Sinh viên Hoàn chỉnh bằng Flask, SQLite & Bootstrap 5',
  description: 'Dự án thực tế tổng hợp toàn bộ kiến thức từ 11 Module: từ cấu trúc Blueprint, xác thực Authentication, cơ sở dữ liệu SQLAlchemy, giao diện Template inheritance cho tới RESTful API.',
  features: [
    'Trang chủ giới thiệu trường học & thống kê số liệu sinh viên',
    'Xác thực người dùng: Đăng nhập, Đăng xuất, Lưu session bảo mật',
    'Dashboard tổng quan: Biểu đồ số lượng sinh viên theo ngành, xếp loại học lực',
    'Danh sách sinh viên có phân trang, tìm kiếm theo tên và lọc theo lớp',
    'Thêm mới sinh viên kèm kiểm tra tính hợp lệ dữ liệu (Form Validation)',
    'Xem chi tiết hồ sơ sinh viên, bảng điểm GPA',
    'Chỉnh sửa thông tin sinh viên và xóa có xác nhận cảnh báo an toàn',
    'Giao diện Bootstrap 5 responsive, thông báo tương tác với Flash Messages',
    'Tích hợp sẵn REST API endpoints (/api/v1/students) phục vụ kết nối di động'
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'Bước 1. Thiết lập Cấu trúc Thư mục & Môi trường Ảo',
      goal: 'Tạo môi trường ảo cách ly, cài đặt các thư viện cần thiết và thiết lập cấu trúc Application Factory chuẩn.',
      conceptsUsed: ['Virtual Environment (venv)', 'pip install', 'requirements.txt', 'Application Factory Pattern'],
      folderStructure: `student_management/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── extensions.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── student.py
│   ├── blueprints/
│   │   ├── auth/
│   │   ├── students/
│   │   └── api/
│   ├── templates/
│   │   ├── base.html
│   │   ├── auth/
│   │   └── students/
│   └── static/
│       ├── css/
│       └── js/
├── requirements.txt
└── run.py`,
      codeSnippet: {
        filename: 'requirements.txt',
        language: 'bash',
        code: `# Thư viện cần thiết cho dự án
Flask>=3.0.0
Flask-SQLAlchemy>=3.1.1
Werkzeug>=3.0.0
python-dotenv>=1.0.0`
      },
      explanation: [
        'Flask 3.x cung cấp lõi framework hiện đại.',
        'Flask-SQLAlchemy là ORM mạnh mẽ thao tác với SQLite.',
        'Werkzeug chịu trách nhiệm hash mật khẩu pbkdf2 an toàn.'
      ],
      runInstructions: 'Chạy `python -m venv venv`, kích hoạt venv và chạy `pip install -r requirements.txt`.',
      expectedResult: 'Môi trường ảo được khởi tạo và sẵn sàng nạp các module.',
      expansionTasks: ['Tạo file .gitignore để loại trừ thư mục venv/ và file database *.db khi đẩy lên GitHub.']
    },
    {
      stepNumber: 2,
      title: 'Bước 2. Thiết kế Database Models (User & Student)',
      goal: 'Xây dựng 2 bảng cơ sở dữ liệu: User (phục vụ đăng nhập) và Student (lưu hồ sơ sinh viên) bằng SQLAlchemy.',
      conceptsUsed: ['db.Model', 'db.Column', 'Primary Key', 'Unique constraint', 'Password Hashing'],
      codeSnippet: {
        filename: 'app/models/student.py',
        language: 'python',
        code: `from app.extensions import db
from datetime import datetime

class Student(db.Model):
    __tablename__ = "students"
    
    id = db.Column(db.Integer, primary_key=True)
    student_code = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    major = db.Column(db.String(100), nullable=False, default="CNTT")
    gpa = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "student_code": self.student_code,
            "full_name": self.full_name,
            "email": self.email,
            "major": self.major,
            "gpa": self.gpa
        }`
      },
      explanation: [
        'student_code và email được đánh chỉ mục unique=True tránh trùng lặp sinh viên.',
        'Hàm to_dict() giúp tuần tự hóa thành JSON phục vụ REST API ở bước sau.'
      ],
      runInstructions: 'Chạy lệnh khởi tạo bảng qua `db.create_all()` trong flask shell hoặc file seed.',
      expectedResult: 'File SQLite instance/student_app.db được tạo ra chứa đầy đủ các cột dữ liệu.',
      expansionTasks: ['Thêm cột avatar_url để lưu ảnh chân dung sinh viên.']
    },
    {
      stepNumber: 3,
      title: 'Bước 3. Xây dựng CRUD: Danh sách và Thêm mới Sinh viên',
      goal: 'Viết view function hiển thị bảng danh sách sinh viên kèm thanh tìm kiếm và form thêm mới sinh viên có Flash messages.',
      conceptsUsed: ['render_template', 'request.form', 'db.session.add', 'flash()', 'redirect'],
      codeSnippet: {
        filename: 'app/blueprints/students/routes.py',
        language: 'python',
        code: `from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.models.student import Student
from app.extensions import db

students_bp = Blueprint("students", __name__, url_prefix="/students")

@students_bp.route("/")
def index():
    keyword = request.args.get("q", "")
    if keyword:
        student_list = Student.query.filter(Student.full_name.contains(keyword)).all()
    else:
        student_list = Student.query.order_by(Student.created_at.desc()).all()
    return render_template("students/index.html", students=student_list, keyword=keyword)

@students_bp.route("/add", methods=["GET", "POST"])
def add_student():
    if request.method == "POST":
        code = request.form.get("student_code")
        name = request.form.get("full_name")
        email = request.form.get("email")
        major = request.form.get("major")
        gpa = float(request.form.get("gpa", 0.0))
        
        new_sv = Student(student_code=code, full_name=name, email=email, major=major, gpa=gpa)
        db.session.add(new_sv)
        db.session.commit()
        flash("Thêm sinh viên thành công!", category="success")
        return redirect(url_for("students.index"))
        
    return render_template("students/add.html")`
      },
      explanation: [
        'Hỗ trợ lọc sinh viên theo từ khóa với Student.full_name.contains(keyword).',
        'Thao tác POST lưu trực tiếp vào cơ sở dữ liệu và hiển thị flash message màu xanh.'
      ],
      runInstructions: 'Mở trình duyệt truy cập http://127.0.0.1:5000/students để quản lý hồ sơ sinh viên.',
      expectedResult: 'Giao diện bảng danh sách hiện đại với Bootstrap, có các nút Xem, Sửa, Xóa và Thêm mới.',
      expansionTasks: ['Tích hợp thư viện WTForms để tự động hóa validate dữ liệu phía server.']
    },
    {
      stepNumber: 4,
      title: 'Bước 4. Cung cấp RESTful API cho Ứng dụng Di động',
      goal: 'Viết các API endpoint GET, POST, PUT, DELETE trả về JSON chuẩn cho các thiết bị ngoài tích hợp.',
      conceptsUsed: ['jsonify', 'request.get_json()', 'HTTP Status 200, 201, 204, 404', 'API Blueprint'],
      codeSnippet: {
        filename: 'app/blueprints/api/routes.py',
        language: 'python',
        code: `from flask import Blueprint, jsonify, request
from app.models.student import Student
from app.extensions import db

api_bp = Blueprint("api", __name__, url_prefix="/api/v1")

@api_bp.route("/students", methods=["GET"])
def get_all_students():
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students]), 200

@api_bp.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": f"Đã xóa sinh viên mang ID {id}"}), 200`
      },
      explanation: [
        'Endpoint /api/v1/students trả về danh sách JSON thuần.',
        'Hỗ trợ xóa sinh viên qua phương thức DELETE chuẩn RESTful.'
      ],
      runInstructions: 'Dùng Postman hoặc cURL gửi request: `curl http://127.0.0.1:5000/api/v1/students`.',
      expectedResult: 'Nhận về mảng JSON chứa đầy đủ hồ sơ sinh viên.',
      expansionTasks: ['Thêm mã xác thực Bearer JWT Token để bảo vệ các API nhạy cảm.']
    }
  ]
};
