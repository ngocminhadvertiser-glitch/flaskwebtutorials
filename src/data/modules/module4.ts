import { Module } from '../../types';

export const MODULE_4: Module = {
  id: 'module-4',
  moduleNumber: 4,
  title: 'MODULE 04 – HTML Templates và Jinja2',
  description: 'Tách biệt mã logic Python và giao diện giao tiếp người dùng HTML. Làm chủ cú pháp Jinja2 (biến, cấu trúc rẽ nhánh, vòng lặp) và kỹ thuật kế thừa template tối ưu.',
  icon: 'Layout',
  lessons: [
    {
      id: 'lesson-9',
      moduleId: 'module-4',
      lessonNumber: 9,
      title: 'Bài 9. render_template() và Truyền dữ liệu',
      slug: 'render-template-va-truyen-du-lieu',
      orderIndex: 9,
      isPublished: true,
      objectives: [
        'Hiểu lý do tại sao không nên viết chuỗi HTML trực tiếp trong file Python',
        'Tạo thư mục chuẩn `templates/` của Flask',
        'Sử dụng hàm `render_template()` để hiển thị file giao diện',
        'Truyền biến từ hàm view sang file template dưới dạng Keyword Arguments hoặc Dictionary'
      ],
      concepts: [
        {
          title: 'Template Engine và render_template()',
          definition: 'Hàm `render_template(template_name, **context)` nạp file HTML từ thư mục `templates/`, điền các biến dữ liệu Python vào và trả về chuỗi HTML hoàn chỉnh.',
          explanation: 'Quy ước quan trọng của Flask: file HTML bắt buộc phải nằm trong thư mục có tên chính xác là `templates` nằm cùng cấp với file app.py.'
        },
        {
          title: 'Cú pháp Jinja2 Variables `{{ ... }}`',
          definition: 'Cặp dấu ngoặc nhọn đôi `{{ ten_bien }}` là nơi Jinja2 sẽ in giá trị của biến ra trang HTML.',
          explanation: 'Jinja2 tự động thực hiện HTML escaping giúp ngăn ngừa lỗ hổng XSS nguy hiểm khi in dữ liệu do người dùng nhập.'
        }
      ],
      codeExample: {
        filename: 'app.py',
        language: 'python',
        code: `from flask import Flask, render_template

app = Flask(__name__)

@app.route("/profile")
def profile():
    student_data = {
        "name": "Trần Thị Mai",
        "id": "SV2026-001",
        "major": "Lập trình Web Flask",
        "gpa": 3.85
    }
    # Truyền dữ liệu sang file profile.html
    return render_template("profile.html", student=student_data, school="Cao đẳng CNTT")`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 1',
          codeSnippet: 'from flask import Flask, render_template',
          explanation: 'Import hàm render_template từ gói thư viện flask.'
        },
        {
          lineRange: 'Dòng 14',
          codeSnippet: 'return render_template("profile.html", student=student_data, school="Cao đẳng CNTT")',
          explanation: 'Flask tự động tìm file profile.html trong thư mục templates/. Các tham số student và school sẽ sẵn sàng để gọi trong file HTML bằng {{ student.name }} và {{ school }}.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/profile',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<div class="card"><h2>Trần Thị Mai (SV2026-001)</h2><p>Ngành: Lập trình Web Flask</p><p>Trường: Cao đẳng CNTT</p></div>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:40:00] "GET /profile HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-18',
        question: 'Trong Flask, các file giao diện HTML mặc định phải được đặt ở thư mục nào?',
        options: [
          { letter: 'A', text: 'thư mục views/' },
          { letter: 'B', text: 'thư mục templates/' },
          { letter: 'C', text: 'thư mục public/' },
          { letter: 'D', text: 'thư mục html/' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Thư mục chuẩn mặc định của Flask là `templates/`.'
      },
      practice: {
        id: 'prac-18',
        title: 'Hiển thị Thẻ Sinh Viên qua Template',
        taskDescription: 'Tạo route /card và template card.html hiển thị thông tin sinh viên đẹp mắt.',
        requirements: [
          'Tạo file templates/card.html',
          'Truyền các biến: name, class_name, avatar_url',
          'Hiển thị biến bằng cú pháp {{ ... }}'
        ],
        hints: ['render_template("card.html", name="Lê Hoàng", class_name="CD24-WEB")'],
        sampleCode: `<!-- templates/card.html -->
<div style="border: 2px solid #0056b3; padding: 20px; border-radius: 8px;">
    <h2>Họ và tên: {{ name }}</h2>
    <p>Lớp: <strong>{{ class_name }}</strong></p>
</div>`,
        expectedResult: 'Trình duyệt render thẻ sinh viên với dữ liệu được điền tự động.',
        expansionTasks: ['Thêm bộ lọc filter biến như {{ name|upper }} để chuyển thành chữ in hoa.']
      },
      quizzes: [
        {
          id: 'q9-1',
          lessonId: 'lesson-9',
          questionText: 'Cú pháp Jinja2 nào sau đây dùng để hiển thị giá trị của một biến ra màn hình HTML?',
          options: [
            { id: 'opt-1', letter: 'A', text: '{% variable %}', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '{{ variable }}', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '*( variable )*', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '<% variable %>', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Cặp dấu ngoặc nhọn kép {{ }} dùng cho biểu thức và in giá trị biến trong Jinja2.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q9-2',
          lessonId: 'lesson-9',
          questionText: 'Nếu file HTML đặt trong thư mục `templates/admin/dashboard.html`, ta gọi hàm render_template như thế nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'render_template("dashboard.html")', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'render_template("admin/dashboard.html")', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'render_template("templates.admin.dashboard")', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'render_template("../dashboard.html")', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Đường dẫn tính từ thư mục gốc templates/, sử dụng dấu gạch chéo phân cách thư mục con.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q9-3',
          lessonId: 'lesson-9',
          questionText: 'Cách truyền toàn bộ các key-value của một dictionary `data` vào template một cách ngắn gọn là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'render_template("index.html", data)', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'render_template("index.html", **data)', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'render_template("index.html", unpack(data))', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'render_template("index.html", *data)', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Toán tử unpacking `**data` của Python biến các khóa của dict thành các đối số keyword argument tương ứng.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q9-4',
          lessonId: 'lesson-9',
          questionText: 'Cơ chế nào của Jinja2 giúp bảo vệ trang web khỏi lỗ hổng chèn mã độc XSS khi in biến?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Tự động mã hóa ký tự đặc biệt (Auto HTML Escaping)', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Xóa toàn bộ mã HTML trong template', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Khóa cổng mạng 80', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chỉ chấp nhận số, không chấp nhận chữ', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Jinja2 tự động biến các ký tự như <, >, &, " thành các HTML entity an toàn trừ khi được gắn cờ |safe.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q9-5',
          lessonId: 'lesson-9',
          questionText: 'Nếu cần hiển thị một chuỗi chứa thẻ HTML mà không muốn Jinja2 escape (ví dụ nội dung rich text), ta dùng filter nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: '{{ content|raw }}', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '{{ content|safe }}', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '{{ content|html }}', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '{{ content|unescape }}', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Filter `|safe` thông báo cho Jinja2 biết chuỗi này an toàn và cho phép render trực tiếp ra DOM.',
          difficulty: 'Vận dụng'
        }
      ]
    },
    {
      id: 'lesson-10',
      moduleId: 'module-4',
      lessonNumber: 10,
      title: 'Bài 10. Kế thừa Template (Template Inheritance)',
      slug: 'ke-thua-template-trong-jinja2',
      orderIndex: 10,
      isPublished: true,
      objectives: [
        'Hiểu nguyên tắc DRY (Don\'t Repeat Yourself) trong thiết kế giao diện web',
        'Xây dựng Base Template (`base.html`) chứa khung sườn chung: Header, Nav, Footer',
        'Sử dụng thẻ `{% extends "base.html" %}` để kế thừa',
        'Định nghĩa các khối nội dung ghi đè linh hoạt với `{% block ... %}{% endblock %}`'
      ],
      concepts: [
        {
          title: 'Template Inheritance là gì?',
          definition: 'Kế thừa template là tính năng mạnh mẽ nhất của Jinja2, cho phép tạo một file giao diện khung (base template) và các trang con chỉ cần điền phần nội dung riêng biệt.',
          explanation: 'Nếu website của bạn có 50 trang, thay vì lặp lại mã Navbar và Footer ở cả 50 file, bạn gom chúng vào base.html. Khi muốn thay đổi logo hay số điện thoại, bạn chỉ cần sửa duy nhất 1 file!'
        },
        {
          title: 'Các khối `{% block %}`',
          definition: 'Là các "khoảng trống" được định nghĩa trong base template để các template con chèn nội dung của mình vào.',
          explanation: 'Ví dụ phổ biến:\n- `{% block title %}`: tiêu đề trang con\n- `{% block content %}`: nội dung chính\n- `{% block scripts %}`: thư viện JS riêng của từng trang'
        }
      ],
      codeExample: {
        filename: 'templates/index.html',
        language: 'html',
        code: `<!-- Trang con: templates/index.html -->
{% extends "base.html" %}

{% block title %}Trang chủ Sinh viên{% endblock %}

{% block content %}
<div class="welcome-box">
    <h1>Chào mừng bạn trở lại học tập!</h1>
    <p>Tiến độ tuần này của bạn đang đạt mức Tốt.</p>
</div>
{% endblock %}`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 2',
          codeSnippet: '{% extends "base.html" %}',
          explanation: 'Lệnh extends PHẢI luôn là dòng đầu tiên trong file template con, chỉ định file cha mà nó kế thừa.'
        },
        {
          lineRange: 'Dòng 6-11',
          codeSnippet: '{% block content %} ... {% endblock %}',
          explanation: 'Khối nội dung này sẽ tự động được lắp vào vị trí {% block content %}{% endblock %} tương ứng trong base.html.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/home',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<!DOCTYPE html><html><head><title>Trang chủ Sinh viên</title></head><body><nav>FLASK WEB</nav><main><div class="welcome-box"><h1>Chào mừng bạn trở lại...</h1></div></main><footer>Bản quyền 2026</footer></body></html>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:45:00] "GET /home HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-22',
        question: 'Lệnh `{% extends "base.html" %}` phải nằm ở vị trí nào trong file template con?',
        options: [
          { letter: 'A', text: 'Ở cuối cùng của file' },
          { letter: 'B', text: 'Ở ngay đầu file, trước mọi thẻ HTML khác' },
          { letter: 'C', text: 'Nằm ở bất kỳ đâu không quan trọng' },
          { letter: 'D', text: 'Phải nằm bên trong thẻ <body>' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Jinja2 yêu cầu thẻ extends phải là câu lệnh template đầu tiên trong file con để xác định cây thừa kế.'
      },
      practice: {
        id: 'prac-22',
        title: 'Tổ chức Base Template chuẩn cho Dự án',
        taskDescription: 'Tạo file base.html chuẩn gồm thẻ head, navbar, container cho content và footer.',
        requirements: [
          'Khai báo block title và block content',
          'Tạo trang con about.html kế thừa base.html'
        ],
        hints: ['Dùng {% block content %}{% endblock %}'],
        sampleCode: `<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Flask App{% endblock %}</title>
</head>
<body>
    <header><h1>Học liệu số Flask Web</h1></header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer><p>&copy; 2026 Giáo dục nghề nghiệp</p></footer>
</body>
</html>`,
        expectedResult: 'Trang con kế thừa đầy đủ cấu trúc khung và chỉ hiển thị phần content của riêng nó.',
        expansionTasks: ['Tạo thêm block extra_css để nạp file stylesheet riêng cho từng trang.']
      },
      quizzes: [
        {
          id: 'q10-1',
          lessonId: 'lesson-10',
          questionText: 'Thẻ Jinja2 nào được sử dụng ở đầu file template con để kế thừa giao diện từ file cha?',
          options: [
            { id: 'opt-1', letter: 'A', text: '{% inherit "base.html" %}', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '{% extends "base.html" %}', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '{% import "base.html" %}', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '{% include "base.html" %}', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '{% extends "parent.html" %} là cú pháp chính thức để kế thừa template trong Jinja2.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q10-2',
          lessonId: 'lesson-10',
          questionText: 'Nếu trong template con ta muốn giữ lại toàn bộ nội dung của block cha và chỉ nối thêm nội dung mới, ta dùng hàm gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: '{{ parent_content() }}', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '{{ super() }}', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '{{ keep_base() }}', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '{{ base.block }}', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Hàm `{{ super() }}` gọi lại nội dung gốc đã được định nghĩa trong block của template cha.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q10-3',
          lessonId: 'lesson-10',
          questionText: 'Sự khác biệt căn bản giữa `{% include %}` và `{% extends %}` là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'include chèn trực tiếp một mẩu giao diện nhỏ (như navbar/banner); extends xây dựng cấu trúc kế thừa khung sườn toàn trang', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'include chỉ dùng được cho file CSS', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'extends chạy chậm hơn include 10 lần', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Hai lệnh này hoàn toàn giống nhau', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'include là kỹ thuật nhúng module (mẩu component), còn extends là kế thừa bộ khung cấu trúc.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q10-4',
          lessonId: 'lesson-10',
          questionText: 'Điều gì xảy ra nếu một template con KHÔNG định nghĩa lại một `{% block %}` đã có ở template cha?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Báo lỗi TemplateNotFound', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Nội dung mặc định được viết sẵn bên trong block đó ở template cha sẽ được hiển thị', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Trang web bị xóa trắng hoàn toàn', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Server tự động dừng', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Jinja2 sẽ tự động sử dụng nội dung fallback mặc định được định nghĩa trong block cha nếu con không ghi đè.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q10-5',
          lessonId: 'lesson-10',
          questionText: 'Một file template con có thể kế thừa từ bao nhiêu file template cha cùng lúc trong Jinja2?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Duy nhất 1 file cha (đơn kế thừa)', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Không giới hạn số lượng', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Tối đa 3 file', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Tùy theo cấu hình RAM máy chủ', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Mỗi template con chỉ được có một lệnh {% extends %} duy nhất, tuân thủ nguyên tắc đơn kế thừa cấu trúc.',
          difficulty: 'Nhận biết'
        }
      ]
    }
  ]
};
