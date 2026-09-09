import { Module } from '../../types';

export const MODULE_9: Module = {
  id: 'module-9',
  moduleNumber: 9,
  title: 'MODULE 09 – Tổ chức Project Flask & Blueprint',
  description: 'Chuyển từ ứng dụng một file đơn (Single-file app) sang kiến trúc đa tầng chuyên nghiệp: Application Factory Pattern, cấu hình Configuration và phân chia mô-đun bằng Blueprint.',
  icon: 'FolderTree',
  lessons: [
    {
      id: 'lesson-48',
      moduleId: 'module-9',
      lessonNumber: 48,
      title: 'Bài 48. Sử dụng Blueprint để phân chia Route',
      slug: 'su-dung-blueprint-de-phan-chia-route',
      orderIndex: 48,
      isPublished: true,
      objectives: [
        'Hiểu tại sao một dự án lớn không thể để toàn bộ route trong một file app.py duy nhất',
        'Khái niệm Blueprint: "Ứng dụng con" độc lập có thể đăng ký vào ứng dụng chính',
        'Khởi tạo một Blueprint: `auth_bp = Blueprint("auth", __name__, url_prefix="/auth")`',
        'Đăng ký Blueprint vào ứng dụng bằng `app.register_blueprint(auth_bp)`'
      ],
      concepts: [
        {
          title: 'Blueprint trong Flask là gì?',
          definition: 'Blueprint là cơ chế cho phép bạn tổ chức các route, template, static files có liên quan thành các nhóm mô-đun độc lập (ví dụ: auth, admin, api, learning).',
          explanation: 'Thay vì dùng `@app.route()`, trong file của từng nhóm bạn dùng `@auth_bp.route()`. Sau đó trong file chính, bạn đăng ký một lần với `app.register_blueprint(auth_bp)`. Điều này giúp nhiều lập trình viên làm việc cùng lúc trên các nhánh mà không lo xung đột file!'
        },
        {
          title: 'Tiền tố đường dẫn `url_prefix`',
          definition: 'Tham số `url_prefix="/auth"` tự động gắn tiền tố vào trước mọi route của blueprint đó.',
          explanation: 'Nếu trong blueprint có route `/login`, khi đăng ký với prefix `/auth`, URL truy cập trên trình duyệt sẽ tự động là `/auth/login`.'
        }
      ],
      codeExample: {
        filename: 'app/blueprints/auth/routes.py',
        language: 'python',
        code: `# File: app/blueprints/auth/routes.py
from flask import Blueprint, render_template

# Khởi tạo Blueprint cho nhóm chức năng xác thực
auth_bp = Blueprint("auth", __name__, template_folder="templates")

@auth_bp.route("/login")
def login():
    return "<h1>Trang đăng nhập thuộc Auth Blueprint</h1>"

@auth_bp.route("/register")
def register():
    return "<h1>Trang đăng ký tài khoản</h1>"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 5',
          codeSnippet: 'auth_bp = Blueprint("auth", __name__, template_folder="templates")',
          explanation: 'Tạo đối tượng Blueprint với tên "auth".'
        },
        {
          lineRange: 'Dòng 7',
          codeSnippet: '@auth_bp.route("/login")',
          explanation: 'Gắn route vào Blueprint auth_bp thay vì gắn trực tiếp vào biến app toàn cục.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/auth/login',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<h1>Trang đăng nhập thuộc Auth Blueprint</h1>',
        serverConsoleLog: [
          'Registering blueprint "auth" with url_prefix="/auth"',
          '127.0.0.1 - - [09/Sep/2026 10:15:00] "GET /auth/login HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-48',
        question: 'Khi đăng ký Blueprint `auth` với `url_prefix="/auth"`, muốn gọi url_for tới hàm `login`, ta viết như thế nào?',
        options: [
          { letter: 'A', text: 'url_for("login")' },
          { letter: 'B', text: 'url_for("auth.login")' },
          { letter: 'C', text: 'url_for("/auth/login")' },
          { letter: 'D', text: 'url_for("auth_bp.login")' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Khi dùng Blueprint, endpoint name được định danh theo định dạng `<blueprint_name>.<view_function_name>` (ví dụ: `auth.login`).'
      },
      practice: {
        id: 'prac-48',
        title: 'Tạo Admin Blueprint có url_prefix="/admin"',
        taskDescription: 'Tạo Blueprint `admin_bp` và đăng ký vào ứng dụng với 2 trang: /admin/ và /admin/users.',
        requirements: [
          'Blueprint("admin", __name__)',
          'app.register_blueprint(admin_bp, url_prefix="/admin")'
        ],
        hints: ['Đăng ký ở file chính bằng app.register_blueprint()'],
        sampleCode: `from flask import Flask, Blueprint

app = Flask(__name__)
admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/")
def dashboard():
    return "Admin Dashboard"

@admin_bp.route("/users")
def users():
    return "Quản lý người dùng"

app.register_blueprint(admin_bp, url_prefix="/admin")`,
        expectedResult: 'Truy cập /admin và /admin/users hoạt động chính xác theo phân cấp module.',
        expansionTasks: ['Tạo thêm template_folder riêng cho admin blueprint.']
      },
      quizzes: [
        {
          id: 'q48-1',
          lessonId: 'lesson-48',
          questionText: 'Trong Flask, Blueprint được sử dụng chủ yếu nhằm mục đích gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Nén kích thước ảnh website', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Phân chia ứng dụng thành các mô-đun logic độc lập, giúp dự án lớn dễ bảo trì và làm việc nhóm', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Tự động tạo cơ sở dữ liệu SQL', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chỉ dùng để đổi màu giao diện', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Blueprint là công cụ tổ chức kiến trúc mô-đun hóa cốt lõi của Flask cho các dự án thực tế.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q48-2',
          lessonId: 'lesson-48',
          questionText: 'Lệnh nào sau đây dùng để kích hoạt (đăng ký) một Blueprint vào ứng dụng Flask chính?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'app.include_blueprint()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'app.register_blueprint()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'app.mount()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'app.use()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '`app.register_blueprint(blueprint_instance, url_prefix="...")` là hàm đăng ký chuẩn.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q48-3',
          lessonId: 'lesson-48',
          questionText: 'Mô hình thiết kế "Application Factory" trong Flask hoạt động như thế nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Khởi tạo đối tượng `app` bên trong một hàm (ví dụ: `def create_app():`), cho phép tạo nhiều instance phục vụ kiểm thử và cấu hình linh hoạt', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Dùng trí tuệ nhân tạo để tự viết code', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Chỉ chạy được trong nhà máy sản xuất phần cứng', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Tạo file HTML tĩnh tự động', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Application Factory (create_app) giúp tránh lỗi tham chiếu vòng (circular imports) và hỗ trợ viết Unit Test cực kỳ dễ dàng.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q48-4',
          lessonId: 'lesson-48',
          questionText: 'Khi gọi hàm `url_for()` trỏ đến view function trong một Blueprint, quy ước đặt tên endpoint là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Chỉ cần tên hàm', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '"ten_blueprint.ten_ham"', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '"ten_blueprint/ten_ham"', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Tên file .py', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Blueprint tạo ra một namespace riêng, do đó endpoint có dạng "blueprint_name.function_name".',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q48-5',
          lessonId: 'lesson-48',
          questionText: 'Thư viện nào của Python thường dùng để nạp các cấu hình nhạy cảm (như SECRET_KEY, DATABASE_URL) từ file `.env`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'python-dotenv', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'flask-random', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'auto-config', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'sys-env', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'python-dotenv đọc file .env và nạp vào os.environ, bảo vệ an toàn cho các bí mật mã nguồn.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};

export const MODULE_10: Module = {
  id: 'module-10',
  moduleNumber: 10,
  title: 'MODULE 10 – Xây dựng REST API với Flask',
  description: 'Tìm hiểu kiến trúc RESTful Web Services, định dạng trao đổi dữ liệu JSON, hàm `jsonify()`, nhận JSON Payload từ request và xây dựng bộ CRUD API hoàn chỉnh.',
  icon: 'Cpu',
  lessons: [
    {
      id: 'lesson-53',
      moduleId: 'module-10',
      lessonNumber: 53,
      title: 'Bài 53. JSON Response và hàm jsonify()',
      slug: 'json-response-va-ham-jsonify',
      orderIndex: 53,
      isPublished: true,
      objectives: [
        'Hiểu định dạng dữ liệu chuẩn JSON (JavaScript Object Notation)',
        'Sử dụng hàm `jsonify()` của Flask để trả về HTTP response với Content-Type: application/json',
        'Cách Flask 3+ tự động chuyển đổi Python Dictionary thành JSON response',
        'Quy ước trả về mã trạng thái HTTP chuẩn (200, 201, 400, 404)'
      ],
      concepts: [
        {
          title: 'REST API và JSON là gì?',
          definition: 'REST API là tiêu chuẩn giao tiếp giữa các hệ thống, máy chủ trả về dữ liệu thuần túy (thường là JSON) thay vì trả về giao diện HTML hoàn chỉnh.',
          explanation: 'Nhờ có REST API, ứng dụng Flask của bạn có thể phục vụ cùng lúc cho ứng dụng Mobile (Flutter, React Native), ứng dụng Frontend (React, Vue) hoặc tích hợp với các hệ thống thứ ba.'
        },
        {
          title: 'Hàm jsonify()',
          definition: 'jsonify() tuần tự hóa (serialize) các kiểu dữ liệu Python (dict, list, string, number) thành chuỗi JSON và thiết lập header `Content-Type: application/json`.',
          explanation: 'Trong Flask 3, nếu bạn trả về một `dict` hoặc `list` trực tiếp từ view function, Flask sẽ tự động gọi `jsonify()` phía sau hậu trường.'
        }
      ],
      codeExample: {
        filename: 'api_demo.py',
        language: 'python',
        code: `from flask import Flask, jsonify, request

app = Flask(__name__)

# Dữ liệu danh sách sinh viên mẫu
STUDENTS = [
    {"id": 1, "name": "Nguyễn Văn An", "gpa": 3.7},
    {"id": 2, "name": "Trần Thị Bích", "gpa": 3.9}
]

# API GET: lấy danh sách sinh viên
@app.route("/api/students", methods=["GET"])
def get_students():
    return jsonify({
        "success": True,
        "count": len(STUDENTS),
        "data": STUDENTS
    }), 200

# API POST: thêm mới sinh viên
@app.route("/api/students", methods=["POST"])
def create_student():
    data = request.get_json() # Đọc JSON gửi từ client
    if not data or "name" not in data:
        return jsonify({"error": "Dữ liệu không hợp lệ"}), 400
        
    new_student = {
        "id": len(STUDENTS) + 1,
        "name": data["name"],
        "gpa": data.get("gpa", 0.0)
    }
    STUDENTS.append(new_student)
    return jsonify({"message": "Thêm thành công", "student": new_student}), 201`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 14',
          codeSnippet: 'return jsonify({...}), 200',
          explanation: 'Đóng gói dữ liệu Python thành JSON chuẩn và đính kèm mã trạng thái 200 OK.'
        },
        {
          lineRange: 'Dòng 22',
          codeSnippet: 'data = request.get_json()',
          explanation: 'Phân tích (parse) phần thân HTTP Request dạng JSON thành Python dictionary an toàn.'
        },
        {
          lineRange: 'Dòng 32',
          codeSnippet: 'return jsonify(...), 201',
          explanation: 'Mã 201 Created biểu thị tài nguyên mới đã được tạo thành công trên server.'
        }
      ],
      simulation: {
        method: 'POST',
        endpoint: '/api/students',
        requestBody: '{"name": "Lê Quang Hải", "gpa": 3.85}',
        expectedStatus: 201,
        responseType: 'json',
        responsePreview: '{\n  "message": "Thêm thành công",\n  "student": {\n    "id": 3,\n    "name": "Lê Quang Hải",\n    "gpa": 3.85\n  }\n}',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 10:20:00] "POST /api/students HTTP/1.1" 201 -',
          'Content-Type: application/json'
        ]
      },
      quickCheck: {
        id: 'qc-53',
        question: 'Để đọc dữ liệu JSON gửi lên từ client trong Flask, ta dùng phương thức nào?',
        options: [
          { letter: 'A', text: 'request.form.get()' },
          { letter: 'B', text: 'request.get_json()' },
          { letter: 'C', text: 'request.read_text()' },
          { letter: 'D', text: 'request.args.json()' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! `request.get_json()` tự động kiểm tra header Content-Type và phân tích chuỗi JSON thành Python Dict.'
      },
      practice: {
        id: 'prac-53',
        title: 'Xây dựng API Tra cứu Sinh viên theo ID (GET /api/students/<id>)',
        taskDescription: 'Viết endpoint trả về thông tin chi tiết của 1 sinh viên. Nếu không tìm thấy, trả về lỗi 404 với JSON thông báo.',
        requirements: [
          'Tìm kiếm trong danh sách STUDENTS theo id',
          'Nếu tìm thấy: return jsonify(student), 200',
          'Nếu không tìm thấy: return jsonify({"error": "Không tìm thấy"}), 404'
        ],
        hints: ['Dùng next((s for s in STUDENTS if s["id"] == student_id), None)'],
        sampleCode: `@app.route("/api/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = next((s for s in STUDENTS if s["id"] == student_id), None)
    if not student:
        return jsonify({"error": "Không tìm thấy sinh viên"}), 404
    return jsonify(student), 200`,
        expectedResult: 'Truy cập /api/students/1 trả về JSON thông tin, /api/students/999 trả về 404 kèm JSON thông báo.',
        expansionTasks: ['Thêm phương thức DELETE để xóa sinh viên khỏi danh sách qua API.']
      },
      quizzes: [
        {
          id: 'q53-1',
          lessonId: 'lesson-53',
          questionText: 'Header HTTP nào được `jsonify()` tự động thiết lập trong phản hồi trả về cho client?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Content-Type: text/html', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Content-Type: application/json', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Content-Type: multipart/form-data', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Content-Type: text/plain', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '`application/json` là MIME type chuẩn quốc tế cho định dạng JSON.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q53-2',
          lessonId: 'lesson-53',
          questionText: 'Mã trạng thái HTTP nào biểu thị một tài nguyên mới vừa được tạo thành công trên máy chủ?',
          options: [
            { id: 'opt-1', letter: 'A', text: '200 OK', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '201 Created', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '204 No Content', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '304 Not Modified', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Mã 201 Created là chuẩn RESTful khi thao tác POST tạo mới thành công.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q53-3',
          lessonId: 'lesson-53',
          questionText: 'Trong chuẩn thiết kế RESTful API, phương thức HTTP nào thường được dùng để cập nhật một phần dữ liệu của tài nguyên?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'PATCH', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'GET', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'DELETE', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'HEAD', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'PUT dùng để thay thế toàn bộ tài nguyên, còn PATCH dùng để cập nhật một vài trường dữ liệu cụ thể.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q53-4',
          lessonId: 'lesson-53',
          questionText: 'Nếu client gửi một request không có header `Content-Type: application/json`, `request.get_json()` sẽ trả về gì mặc định?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Lỗi ném ra Exception', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'None', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Dict rỗng {}', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chuỗi rỗng ""', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Mặc định get_json() trả về None nếu mime type không phải json (trừ khi dùng get_json(force=True)).',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q53-5',
          lessonId: 'lesson-53',
          questionText: 'CORS (Cross-Origin Resource Sharing) là gì và thư viện Flask nào hỗ trợ kích hoạt CORS dễ dàng?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Cơ chế bảo mật trình duyệt chặn gọi API giữa 2 domain khác nhau; giải quyết bằng thư viện `flask-cors`', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Hệ thống gửi email tự động', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Trình biên dịch Python sang C', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Hệ thống nén file zip', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Khi Frontend (React/Vue) và Backend (Flask) chạy ở hai port/domain khác nhau, cần cài `flask-cors` (CORS(app)) để trình duyệt cho phép trao đổi dữ liệu.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};
