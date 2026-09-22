import { Module } from '../../types';

export const MODULE_5: Module = {
  id: 'module-5',
  moduleNumber: 5,
  title: 'MODULE 05 – Static Files và Giao diện Web',
  description: 'Quản lý tài nguyên tĩnh (CSS, JavaScript, hình ảnh, web fonts) trong thư mục static/. Tích hợp framework CSS Bootstrap 5 và thiết kế giao diện hiện đại chuẩn EdTech.',
  icon: 'Palette',
  lessons: [
    {
      id: 'lesson-11',
      moduleId: 'module-5',
      lessonNumber: 11,
      title: 'Bài 11. Cấu trúc thư mục static & Tích hợp Bootstrap',
      slug: 'cau-truc-static-va-tich-hop-bootstrap',
      orderIndex: 11,
      isPublished: true,
      objectives: [
        'Hiểu quy ước tổ chức thư mục `static/` (css, js, images)',
        'Sử dụng `url_for("static", filename="...")` để nạp tài nguyên tĩnh an toàn',
        'Tích hợp framework Bootstrap 5 thông qua CDN và file cục bộ',
        'Sử dụng các component Bootstrap phổ biến: Navbar, Card, Button, Badge'
      ],
      concepts: [
        {
          title: 'Thư mục static/ trong Flask',
          definition: 'Thư mục static là nơi lưu trữ các file mà máy chủ gửi thẳng tới trình duyệt mà không cần Jinja2 biên dịch.',
          explanation: 'Cấu trúc khuyến nghị chuẩn nghề nghiệp:\n```\nstatic/\n├── css/\n│   └── style.css\n├── js/\n│   └── main.js\n└── images/\n    └── logo.png\n```'
        },
        {
          title: 'Tích hợp Bootstrap 5',
          definition: 'Bootstrap 5 cung cấp hệ thống lưới (Grid system responsive) và các component giao diện đã được định kiểu đẹp mắt.',
          explanation: 'Chỉ cần nhúng liên kết CSS và Bundle JS vào base.html, toàn bộ các trang con đều được hưởng lợi từ giao diện chuẩn, tương thích cả máy tính và điện thoại.'
        }
      ],
      codeExample: {
        filename: 'templates/base.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Flask App{% endblock %}</title>
    <!-- Nhúng Bootstrap 5 CSS qua CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Nhúng CSS tùy chỉnh từ thư mục static -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body class="bg-light">
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="{{ url_for('home') }}">FLASK LEARNING</a>
        </div>
    </nav>
    <div class="container py-4">
        {% block content %}{% endblock %}
    </div>
</body>
</html>`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 10',
          codeSnippet: '{{ url_for("static", filename="css/style.css") }}',
          explanation: 'Sinh đường dẫn URL tĩnh chính xác /static/css/style.css.'
        },
        {
          lineRange: 'Dòng 14',
          codeSnippet: '<nav class="navbar navbar-expand-lg navbar-dark bg-primary">',
          explanation: 'Sử dụng utility classes của Bootstrap 5 để tạo thanh điều hướng màu xanh lam chuyên nghiệp và responsive.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/dashboard',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<div class="card shadow-sm"><div class="card-body"><h5 class="card-title text-primary">Giao diện Bootstrap 5 Hoạt động!</h5></div></div>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:50:00] "GET /dashboard HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-11',
        question: 'Tại sao nên dùng `url_for("static", filename="...")` thay vì viết cứng `/static/...`?',
        options: [
          { letter: 'A', text: 'Giúp tự động xử lý tiền tố URL, hỗ trợ caching và tương thích khi đổi cấu hình host/sub-path' },
          { letter: 'B', text: 'Chỉ vì viết dài cho đẹp' },
          { letter: 'C', text: 'Nếu không dùng url_for thì file CSS bị xóa mất' },
          { letter: 'D', text: 'Trình duyệt cấm viết /static' }
        ],
        correctLetter: 'A',
        explanation: 'Chính xác! url_for đảm bảo tính linh hoạt khi triển khai ứng dụng trên máy chủ hoặc reverse proxy Nginx.'
      },
      practice: {
        id: 'prac-11',
        title: 'Thiết kế Card thông tin khóa học bằng Bootstrap 5',
        taskDescription: 'Sử dụng Bootstrap Card để tạo thẻ hiển thị môn học với ảnh đại diện, tiêu đề và nút đăng ký.',
        requirements: [
          'Dùng class card, card-img-top, card-body, card-title',
          'Nút bấm button với class "btn btn-primary"'
        ],
        hints: ['Xem cấu trúc Bootstrap Card Component'],
        sampleCode: `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Khóa học Flask Web</h5>
        <p class="card-text">Học lập trình web Python từ con số 0 đến chuyên nghiệp.</p>
        <a href="#" class="btn btn-primary">Bắt đầu học</a>
    </div>
</div>`,
        expectedResult: 'Thẻ card hiển thị bóng mờ nhẹ, bo góc và nút màu xanh chuẩn phong cách EdTech.',
        expansionTasks: ['Thêm badge "Mới nhất" ở góc trên card với class badge bg-success.']
      },
      quizzes: [
        {
          id: 'q11-1',
          lessonId: 'lesson-11',
          questionText: 'Thư mục mặc định trong dự án Flask dùng để lưu trữ file CSS, JavaScript và ảnh tên là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'assets/', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'static/', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'public/', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'resources/', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask quy ước tên thư mục tài nguyên tĩnh là `static/`.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q11-2',
          lessonId: 'lesson-11',
          questionText: 'Cách nào để nạp file ảnh `logo.png` trong thư mục `static/images/` vào template HTML?',
          options: [
            { id: 'opt-1', letter: 'A', text: '<img src="{{ url_for("static", filename="images/logo.png") }}">', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: '<img src="/images/logo.png">', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: '<img flask="logo.png">', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '<img src="{{ static.images.logo }}">', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Hàm `url_for("static", filename="images/logo.png")` là chuẩn cú pháp chính thức của Flask.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q11-3',
          lessonId: 'lesson-11',
          questionText: 'Khi cập nhật nội dung file CSS trong thư mục static nhưng trình duyệt không đổi giao diện, nguyên nhân phổ biến nhất là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Trình duyệt đang lưu bộ nhớ đệm (Browser Cache) của file CSS cũ', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Flask không cho phép sửa file CSS', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Hết dung lượng RAM', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'File CSS bị hỏng font', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Trình duyệt cache file tĩnh rất mạnh. Bạn cần nhấn Ctrl + F5 (Hard Reload) hoặc thêm query string phiên bản như `?v=2` để ép tải lại.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q11-4',
          lessonId: 'lesson-11',
          questionText: 'Để định nghĩa giao diện tương thích tốt trên thiết bị di động (Responsive), thẻ meta nào trong `<head>` là bắt buộc?',
          options: [
            { id: 'opt-1', letter: 'A', text: '<meta name="keywords">', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '<meta http-equiv="refresh">', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '<meta name="author">', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Thẻ meta viewport yêu cầu trình duyệt di động hiển thị theo tỷ lệ chiều rộng thực tế của màn hình thiết bị.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q11-5',
          lessonId: 'lesson-11',
          questionText: 'Class nào trong Bootstrap 5 được sử dụng để căn lề nội dung vào giữa và giới hạn độ rộng tối đa?',
          options: [
            { id: 'opt-1', letter: 'A', text: '.box-center', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '.container', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '.wrapper', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '.body-align', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Class `.container` trong Bootstrap tạo khung bao quanh có độ rộng responsive phù hợp với từng breakpoint màn hình.',
          difficulty: 'Nhận biết'
        }
      ]
    }
  ]
};

export const MODULE_6: Module = {
  id: 'module-6',
  moduleNumber: 6,
  title: 'MODULE 06 – Form và Xử lý Dữ liệu',
  description: 'Quy trình xử lý dữ liệu biểu mẫu: thu thập dữ liệu Form, kiểm tra tính hợp lệ (Validation) ở phía server, hiển thị thông báo tức thì với Flash Messages.',
  icon: 'CheckSquare',
  lessons: [
    {
      id: 'lesson-12',
      moduleId: 'module-6',
      lessonNumber: 12,
      title: 'Bài 12. Flash Messages trong Flask',
      slug: 'flash-messages-trong-flask',
      orderIndex: 12,
      isPublished: true,
      objectives: [
        'Hiểu khái niệm Flash Message: thông báo xuất hiện 1 lần duy nhất sau một hành động',
        'Cấu hình `app.secret_key` - điều kiện bắt buộc để flash hoạt động',
        'Sử dụng hàm `flash("thông báo", category="success")`',
        'Dùng hàm `get_flashed_messages(with_categories=True)` trong Jinja2 để hiển thị alert'
      ],
      concepts: [
        {
          title: 'Flash Message là gì?',
          definition: 'Hệ thống gửi thông điệp phản hồi từ server về phía người dùng, thông điệp này được lưu tạm vào Session và tự động biến mất sau khi người dùng tải trang tiếp theo.',
          explanation: 'Rất lý tưởng cho các thông báo như: "Thêm sinh viên thành công!", "Đăng nhập thất bại!", "Đã cập nhật mật khẩu".'
        },
        {
          title: 'Tầm quan trọng của `secret_key`',
          definition: 'Vì Flash message dựa vào Session, Flask yêu cầu ứng dụng phải có một khóa bí mật (`secret_key`) để ký mã hóa dữ liệu cookie chống giả mạo.',
          explanation: 'Nếu không thiết lập chuỗi secret_key phức tạp và an toàn, kẻ tấn công có thể giả mạo cookie phiên làm việc.',
          notes: [
            'Thiếu app.secret_key sẽ gây ra lỗi RuntimeError: The session is unavailable because no secret key was set.'
          ]
        }
      ],
      codeExample: {
        filename: 'flash_demo.py',
        language: 'python',
        code: `from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
# Thiết lập khóa bảo mật session
app.secret_key = "khoa_bi_mat_chuyen_nghiep_2026"

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        if not email:
            flash("Vui lòng nhập địa chỉ email hợp lệ!", category="danger")
            return redirect(url_for("register"))
            
        flash(f"Đăng ký thành công cho tài khoản {email}!", category="success")
        return redirect(url_for("register"))
        
    return render_template("register.html")`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 5',
          codeSnippet: 'app.secret_key = "..."',
          explanation: 'Bắt buộc phải có để Flask ký mật mã hóa phiên làm việc của cookie chứa flash message.'
        },
        {
          lineRange: 'Dòng 12',
          codeSnippet: 'flash("Vui lòng nhập...", category="danger")',
          explanation: 'Tạo thông báo lỗi với phân loại category="danger" để dễ dàng map với class alert-danger của Bootstrap.'
        }
      ],
      simulation: {
        method: 'POST',
        endpoint: '/register',
        requestBody: 'email=student@edu.vn',
        expectedStatus: 302,
        responseType: 'html',
        responsePreview: '<div class="alert alert-success alert-dismissible fade show" role="alert">Đăng ký thành công cho tài khoản student@edu.vn!</div>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:55:00] "POST /register HTTP/1.1" 302 -',
          '127.0.0.1 - - [09/Sep/2026 09:55:01] "GET /register HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-12',
        question: 'Nếu chưa cấu hình `app.secret_key` mà gọi hàm `flash()`, ứng dụng sẽ bị lỗi gì?',
        options: [
          { letter: 'A', text: 'Chạy bình thường không báo lỗi' },
          { letter: 'B', text: 'RuntimeError: The session is unavailable because no secret key was set' },
          { letter: 'C', text: 'SyntaxError: Invalid syntax' },
          { letter: 'D', text: 'Tự động sinh ra khóa ngẫu nhiên' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Flash dùng session bên dưới, nên bắt buộc phải có secret_key.'
      },
      practice: {
        id: 'prac-12',
        title: 'Hiển thị Flash Messages trong Base Template',
        taskDescription: 'Viết khối mã Jinja2 trong base.html để tự động hiển thị mọi flash message với Bootstrap Alert.',
        requirements: [
          'Dùng hàm `get_flashed_messages(with_categories=true)`',
          'Tạo vòng lặp for hiển thị alert với class tương ứng category'
        ],
        hints: ['{% for category, message in get_flashed_messages(with_categories=true) %}'],
        sampleCode: `<!-- Nhúng vào base.html phía trên block content -->
{% with messages = get_flashed_messages(with_categories=true) %}
  {% if messages %}
    {% for category, message in messages %}
      <div class="alert alert-{{ category }} alert-dismissible fade show" role="alert">
        {{ message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    {% endfor %}
  {% endif %}
{% endwith %}`,
        expectedResult: 'Mọi thông báo thành công (success) hiển thị màu xanh, thông báo lỗi (danger) hiển thị màu đỏ.',
        expansionTasks: ['Thêm nút đóng (close button) của Bootstrap để người dùng có thể tắt thông báo chủ động.']
      },
      quizzes: [
        {
          id: 'q12-1',
          lessonId: 'lesson-12',
          questionText: 'Hàm nào trong Flask dùng để tạo thông báo phản hồi gửi sang trang tiếp theo?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'notify()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'flash()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'alert()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'message()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Hàm `flash(message, category)` là hàm tích hợp sẵn của Flask.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q12-2',
          lessonId: 'lesson-12',
          questionText: 'Trong template Jinja2, hàm nào dùng để lấy danh sách các thông báo đã được flash?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'get_messages()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'get_flashed_messages()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'fetch_flashes()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'read_notifications()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '`get_flashed_messages()` lấy và giải phóng toàn bộ các thông điệp khỏi phiên làm việc.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q12-3',
          lessonId: 'lesson-12',
          questionText: 'Đặc điểm mấu chốt của Flash Message là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Lưu vĩnh viễn trong cơ sở dữ liệu', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Chỉ hiển thị một lần duy nhất cho lượt xem trang tiếp theo rồi tự động bị xóa', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Chỉ gửi được chuỗi tối đa 10 chữ cái', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Bắt buộc phải cài thêm server Redis', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flash messages hoạt động theo nguyên tắc "hiển thị 1 lần" (one-time message), tự động dọn sạch sau khi đọc.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q12-4',
          lessonId: 'lesson-12',
          questionText: 'Để phân loại mức độ thông báo (ví dụ: thành công, cảnh báo, nguy hiểm), tham số nào được truyền vào `flash()`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'level', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'category', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'type', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'kind', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Tham số `category="success"` (hoặc "danger", "warning", "info") cho phép phân nhóm và tạo kiểu CSS tương ứng.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q12-5',
          lessonId: 'lesson-12',
          questionText: 'Biến `secret_key` trong Flask dùng thuật toán nào để bảo vệ dữ liệu session cookie phía client?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Ký số mật mã học HMAC (Cryptographic signing) ngăn chặn người dùng sửa nội dung cookie', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Nén file zip thông thường', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Mã hóa base64 ai cũng đọc được', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Xóa cookie ngay sau 1 giây', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Flask dùng itsdangerous để ký số HMAC lên cookie. Nếu người dùng cố tình can thiệp sửa cookie, chữ ký sẽ không khớp và bị hủy.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};
