import { Module } from '../../types';

export const MODULE_7: Module = {
  id: 'module-7',
  moduleNumber: 7,
  title: 'MODULE 07 – Session và Authentication cơ bản',
  description: 'Cơ chế lưu trạng thái người dùng không phụ thuộc stateless HTTP. Xây dựng chức năng Login, Logout, quản lý session an toàn và bảo vệ Route bằng Custom Decorator.',
  icon: 'ShieldCheck',
  lessons: [
    {
      id: 'lesson-13',
      moduleId: 'module-7',
      lessonNumber: 13,
      title: 'Bài 13. Session và Cơ chế Đăng nhập',
      slug: 'session-va-co-che-dang-nhap',
      orderIndex: 13,
      isPublished: true,
      objectives: [
        'Hiểu bản chất phi trạng thái (Stateless) của giao thức HTTP',
        'Cách Flask lưu Client-side Signed Cookie Session',
        'Lưu thông tin đăng nhập vào `session["user_id"]`',
        'Xóa phiên làm việc khi đăng xuất bằng `session.clear()` hoặc `session.pop()`'
      ],
      concepts: [
        {
          title: 'Session là gì?',
          definition: 'Session là cơ chế giúp máy chủ ghi nhớ trạng thái và danh tính của người dùng qua nhiều lượt truy cập khác nhau.',
          explanation: 'Vì HTTP là giao thức "stateless" (mỗi request là độc lập, server không biết bạn vừa truy cập trước đó), Session sử dụng Cookie được ký mật mã (Signed Cookie) để trao đổi danh tính an toàn giữa client và server.'
        },
        {
          title: 'Cách dùng `session` trong Flask',
          definition: 'Đối tượng `session` trong Flask thao tác y hệt như một Dictionary chuẩn của Python.',
          explanation: '- Lưu dữ liệu: `session["user"] = "NguyenVanA"`\n- Lấy dữ liệu: `user = session.get("user")`\n- Đăng xuất: `session.pop("user", None)` hoặc `session.clear()`'
        }
      ],
      codeExample: {
        filename: 'auth_session.py',
        language: 'python',
        code: `from flask import Flask, session, redirect, url_for, request, render_template

app = Flask(__name__)
app.secret_key = "bi_mat_bao_mat_cao_cap"

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Xác thực tài khoản mẫu
        user = request.form.get("username")
        pwd = request.form.get("password")
        if user == "student2026" and pwd == "password123":
            # Lưu trạng thái vào session
            session["logged_in"] = True
            session["username"] = user
            return redirect(url_for("dashboard"))
        return "Sai thông tin đăng nhập!", 401
    return '<form method="POST"><input name="username"><input name="password" type="password"><button>Đăng nhập</button></form>'

@app.route("/logout")
def logout():
    session.clear() # Xóa sạch session
    return redirect(url_for("login"))`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 14-15',
          codeSnippet: 'session["logged_in"] = True \\n session["username"] = user',
          explanation: 'Ghi thông tin vào session. Flask tự động mã hóa và gửi cookie phiên này về trình duyệt của người dùng.'
        },
        {
          lineRange: 'Dòng 22',
          codeSnippet: 'session.clear()',
          explanation: 'Hủy bỏ toàn bộ các biến trong phiên làm việc hiện tại, thực hiện đăng xuất an toàn.'
        }
      ],
      simulation: {
        method: 'POST',
        endpoint: '/login',
        requestBody: 'username=student2026&password=password123',
        expectedStatus: 302,
        responseType: 'text',
        responsePreview: 'Chuyển hướng thành công tới /dashboard. Session Cookie đã được khởi tạo!',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 10:00:00] "POST /login HTTP/1.1" 302 -',
          'Set-Cookie: session=eyJsb2dnZWRfaW4iOnRydWUsInVzZXJuYW1lIjoic3R1ZGVudDIwMjYifQ...; HttpOnly; Path=/'
        ]
      },
      quickCheck: {
        id: 'qc-13',
        question: 'Đối tượng `session` trong Flask có cú pháp thao tác giống kiểu dữ liệu nào trong Python?',
        options: [
          { letter: 'A', text: 'Giống kiểu List' },
          { letter: 'B', text: 'Giống kiểu Dictionary (Dict)' },
          { letter: 'C', text: 'Giống kiểu Tuple' },
          { letter: 'D', text: 'Giống kiểu Set' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! session hỗ trợ các phương thức như session["key"], session.get(), session.pop(), session.clear() hệt như một Python dict.'
      },
      practice: {
        id: 'prac-13',
        title: 'Bảo vệ Route Dashboard bằng kiểm tra Session',
        taskDescription: 'Viết view function /dashboard kiểm tra nếu chưa đăng nhập thì redirect về /login, nếu đã đăng nhập thì chào mừng.',
        requirements: [
          'Kiểm tra session.get("username")',
          'Nếu không có, redirect(url_for("login"))'
        ],
        hints: ['if "username" not in session:'],
        sampleCode: `@app.route("/dashboard")
def dashboard():
    if "username" not in session:
        return redirect(url_for("login"))
    return f"Xin chào {session['username']} đến với Bảng điều khiển sinh viên!"`,
        expectedResult: 'Nếu chưa đăng nhập, tự động bị đẩy về trang đăng nhập.',
        expansionTasks: ['Viết một Python Decorator @login_required để tái sử dụng trên nhiều route khác nhau.']
      },
      quizzes: [
        {
          id: 'q13-1',
          lessonId: 'lesson-13',
          questionText: 'Mặc định trong Flask, dữ liệu session được lưu trữ ở đâu?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Bảng cơ sở dữ liệu MySQL trên server', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Cryptographically-signed Cookie gửi về lưu trữ phía Client (Trình duyệt)', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'RAM của CPU', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Bộ nhớ cache của Nginx', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask sử dụng client-side session cookie được ký mật mã qua itsdangerous.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q13-2',
          lessonId: 'lesson-13',
          questionText: 'Người dùng có thể đọc được nội dung dữ liệu lưu trong cookie session mặc định của Flask không?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Không, vì được mã hóa bí mật cấp quân sự', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Có thể đọc được (vì nó chỉ là base64 json), nhưng KHÔNG THỂ sửa đổi được nếu không có secret_key vì chữ ký số sẽ bị hỏng', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Không ai đọc được kể cả server', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chỉ đọc được khi mở bằng Photoshop', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Cookie mặc định được "Ký số" (signed) chứ không phải "Mã hóa bảo mật" (encrypted). Do đó KHÔNG NÊN lưu mật khẩu thô trong session!',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q13-3',
          lessonId: 'lesson-13',
          questionText: 'Để xóa một biến cụ thể ra khỏi session (ví dụ xóa "cart_id"), hàm nào là an toàn nhất?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'session.remove("cart_id")', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'session.pop("cart_id", None)', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'delete(session["cart_id"])', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'session.drop()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'session.pop("key", None) xóa an toàn và không gây KeyError nếu key đó chưa từng tồn tại.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q13-4',
          lessonId: 'lesson-13',
          questionText: 'Để làm cho phiên đăng nhập duy trì ngay cả khi tắt trình duyệt (Persistent Session), ta thiết lập cấu hình nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'session.permanent = True', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'session.forever = True', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'app.config["KEEP_ALIVE"] = True', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'session.never_expire()', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'session.permanent = True kèm cấu hình PERMANENT_SESSION_LIFETIME (mặc định 31 ngày) tạo cookie có hạn sử dụng dài hạn.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q13-5',
          lessonId: 'lesson-13',
          questionText: 'Thư viện nào phổ biến trong Python dùng để hash (băm mật khẩu) an toàn trước khi lưu trữ?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'werkzeug.security (generate_password_hash)', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'math.sqrt', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'json.dumps', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'os.path', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Werkzeug cung cấp sẵn `generate_password_hash` và `check_password_hash` dùng thuật toán pbkdf2/scrypt an toàn tuyệt đối.',
          difficulty: 'Nhận biết'
        }
      ]
    }
  ]
};

export const MODULE_8: Module = {
  id: 'module-8',
  moduleNumber: 8,
  title: 'MODULE 08 – Cơ sở dữ liệu và Flask-SQLAlchemy',
  description: 'Tích hợp cơ sở dữ liệu quan hệ SQLite. Sử dụng ORM Flask-SQLAlchemy để khai báo Model, tạo bảng tự động và thực hiện trọn vẹn 4 thao tác CRUD (Create, Read, Update, Delete).',
  icon: 'Database',
  lessons: [
    {
      id: 'lesson-14',
      moduleId: 'module-8',
      lessonNumber: 14,
      title: 'Bài 14. Khởi tạo SQLAlchemy và Định nghĩa Model',
      slug: 'khoi-tao-sqlalchemy-va-dinh-nghia-model',
      orderIndex: 14,
      isPublished: true,
      objectives: [
        'Hiểu khái niệm ORM (Object-Relational Mapping): ánh xạ bảng DB thành class Python',
        'Cấu hình chuỗi kết nối URI: `sqlite:///students.db`',
        'Khai báo Model `Student` với các trường dữ liệu: id, name, email, gpa, created_at',
        'Sử dụng lệnh `db.create_all()` trong Application Context để tự động tạo file database'
      ],
      concepts: [
        {
          title: 'ORM và Flask-SQLAlchemy',
          definition: 'ORM là kỹ thuật cho phép bạn thao tác với cơ sở dữ liệu thông qua các đối tượng Python mà không cần viết câu lệnh SQL thuần túy phức tạp.',
          explanation: 'Thay vì viết `SELECT * FROM students WHERE id = 5`, bạn chỉ cần viết `Student.query.get(5)`. Điều này giúp code trong sáng, dễ bảo trì và ngăn ngừa hoàn toàn lỗi bảo mật SQL Injection!'
        },
        {
          title: 'Cấu hình kết nối SQLite',
          definition: 'SQLite là cơ sở dữ liệu nhúng siêu nhẹ lưu gọn trong một file đơn trên đĩa cứng.',
          explanation: 'Cấu hình chuẩn:\n`app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"`\n`app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False`'
        }
      ],
      codeExample: {
        filename: 'models.py',
        language: 'python',
        code: `from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Đường dẫn lưu file SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///school.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Khởi tạo đối tượng database ORM
db = SQLAlchemy(app)

# Định nghĩa bảng Sinh Viên (Model Student)
class Student(db.Model):
    __tablename__ = "students"
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    student_code = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gpa = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<SinhVien {self.student_code}: {self.full_name}>"

# Tạo bảng trong database
with app.app_context():
    db.create_all()`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 14',
          codeSnippet: 'class Student(db.Model):',
          explanation: 'Kế thừa từ db.Model để khai báo đây là một thực thể ORM tương ứng với một bảng trong cơ sở dữ liệu.'
        },
        {
          lineRange: 'Dòng 17',
          codeSnippet: 'id = db.Column(db.Integer, primary_key=True)',
          explanation: 'Định nghĩa cột khóa chính, tự động tăng (Auto-increment) mỗi khi có bản ghi mới.'
        },
        {
          lineRange: 'Dòng 28-29',
          codeSnippet: 'with app.app_context(): \\n db.create_all()',
          explanation: 'Trong Flask 3+, các lệnh tương tác DB phải chạy bên trong app_context(). db.create_all() sẽ quét tất cả Model và tạo bảng nếu chưa có.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/init-db',
        expectedStatus: 200,
        responseType: 'text',
        responsePreview: 'Tạo cơ sở dữ liệu SQLite "school.db" và bảng "students" thành công!',
        serverConsoleLog: [
          'INFO sqlalchemy.engine.Engine PRAGMA foreign_keys=ON',
          'INFO sqlalchemy.engine.Engine CREATE TABLE students (id INTEGER NOT NULL, full_name VARCHAR(100) NOT NULL, ... PRIMARY KEY (id))',
          '127.0.0.1 - - [09/Sep/2026 10:10:00] "GET /init-db HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-14',
        question: 'Lệnh nào của SQLAlchemy dùng để tự động tạo tất cả các bảng đã khai báo trong code?',
        options: [
          { letter: 'A', text: 'db.make_tables()' },
          { letter: 'B', text: 'db.create_all()' },
          { letter: 'C', text: 'db.build_database()' },
          { letter: 'D', text: 'db.init()' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! `db.create_all()` quét qua tất cả các lớp kế thừa từ db.Model và phát lệnh CREATE TABLE tương ứng.'
      },
      practice: {
        id: 'prac-14',
        title: 'Thêm Model Lớp Học (ClassRoom)',
        taskDescription: 'Tạo thêm Model ClassRoom có id, class_code, major và quan hệ 1-N với Student.',
        requirements: [
          'Khai báo class ClassRoom(db.Model)',
          'Chạy db.create_all() để tạo bảng mới'
        ],
        hints: ['class ClassRoom(db.Model): id = db.Column(db.Integer, primary_key=True)'],
        sampleCode: `class ClassRoom(db.Model):
    __tablename__ = "classrooms"
    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(50), nullable=False)
    academic_year = db.Column(db.Integer, default=2026)`,
        expectedResult: 'File SQLite cập nhật thêm bảng classrooms mới.',
        expansionTasks: ['Tìm hiểu về `db.relationship()` để liên kết Student với ClassRoom.']
      },
      quizzes: [
        {
          id: 'q14-1',
          lessonId: 'lesson-14',
          questionText: 'Khái niệm ORM (Object-Relational Mapping) mang lại lợi ích gì cho lập trình viên?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Giúp tự động vẽ biểu đồ hình ảnh', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Cho phép thao tác với database thông qua các đối tượng class Python, tăng tính an toàn và giảm thiểu viết SQL thô', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Giúp tăng dung lượng ổ cứng', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Không cần dùng bất kỳ cơ sở dữ liệu nào', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'ORM cầu nối giữa mô hình hướng đối tượng và cơ sở dữ liệu quan hệ, chống lỗi SQL Injection hiệu quả.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q14-2',
          lessonId: 'lesson-14',
          questionText: 'Chuỗi kết nối nào sau đây cấu hình cơ sở dữ liệu SQLite lưu trong thư mục instance của Flask?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'mysql://localhost/db', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'sqlite:///app.db', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'mongodb://127.0.0.1', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'oracle://sys:pass', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Quy ước URI của SQLite bắt đầu bằng "sqlite:///" (3 dấu gạch chéo cho đường dẫn tương đối).',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q14-3',
          lessonId: 'lesson-14',
          questionText: 'Để định nghĩa một cột khóa chính tự động tăng trong SQLAlchemy, tham số nào được gán bằng `True`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'primary_key=True', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'unique=True', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'indexed=True', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'autokey=True', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: '`primary_key=True` chỉ định cột là khóa chính và tự động kích hoạt auto-increment cho kiểu số nguyên.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q14-4',
          lessonId: 'lesson-14',
          questionText: 'Tại sao từ Flask 2.3+ ta phải bọc `db.create_all()` bên trong khối `with app.app_context():`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Vì SQLAlchemy cần truy cập cấu hình của Flask app đang hoạt động', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Vì Python bắt buộc mọi hàm phải có with', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Để khóa file code không cho người khác xem', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chỉ là quy ước viết cho dài dòng', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'SQLAlchemy cần context của ứng dụng để biết URI và các tham số cấu hình liên quan.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q14-5',
          lessonId: 'lesson-14',
          questionText: 'Để thêm một bản ghi sinh viên mới vào cơ sở dữ liệu và lưu lại vĩnh viễn, cặp lệnh nào là chuẩn xác?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'db.session.add(sv) và db.session.commit()', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'db.insert(sv) và db.save()', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'db.table.push(sv)', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'db.write(sv)', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Mô hình Unit of Work của SQLAlchemy sử dụng `db.session.add()` để đưa vào hàng đợi và `db.session.commit()` để thực thi transaction.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};
