import { Module } from '../../types';

export const MODULE_2: Module = {
  id: 'module-2',
  moduleNumber: 2,
  title: 'MODULE 02 – Routing trong Flask',
  description: 'Nắm vững kỹ thuật khai báo URL tĩnh, dynamic routes với các kiểu URL converters (int, string, path), điều hướng với url_for() và redirect.',
  icon: 'Compass',
  lessons: [
    {
      id: 'lesson-4',
      moduleId: 'module-2',
      lessonNumber: 4,
      title: 'Bài 4. Route cơ bản trong Flask',
      slug: 'route-co-ban',
      orderIndex: 4,
      isPublished: true,
      objectives: [
        'Hiểu bản chất của Route trong ứng dụng web',
        'Khai báo nhiều route trỏ về cùng một view function',
        'Xử lý ký tự gạch chéo cuối cùng (trailing slash `/`) theo chuẩn Flask',
        'Viết mã nguồn quản trị trang chủ, trang giới thiệu và trang dịch vụ'
      ],
      concepts: [
        {
          title: 'Route là gì?',
          definition: 'Route là cầu nối ánh xạ giữa một mẫu URL (URL pattern) với đoạn code Python xử lý tương ứng.',
          explanation: 'Mỗi khi người dùng duyệt web hoặc nhấn vào một đường link, trình duyệt gửi một HTTP Request có chứa URL. Hệ thống Routing của Flask sẽ tìm route trùng khớp nhất để thực thi.'
        },
        {
          title: 'Quy tắc Trailing Slash (`/`)',
          definition: 'Flask chuẩn hóa URL để tránh trùng lặp nội dung (Canonical URL).',
          explanation: 'Nếu route được định nghĩa có gạch chéo ở đuôi `@app.route("/projects/")`, khi người dùng truy cập `/projects`, Flask sẽ tự động redirect sang `/projects/` với mã 308. Ngược lại, nếu route không có slash `@app.route("/about")`, khi truy cập `/about/` sẽ báo lỗi 404.'
        }
      ],
      codeExample: {
        filename: 'routes_demo.py',
        language: 'python',
        code: `from flask import Flask

app = Flask(__name__)

# Nhiều route trỏ về cùng 1 hàm
@app.route("/")
@app.route("/home")
def home():
    return "<h1>Chào mừng đến Trang chủ!</h1>"

# Route có trailing slash
@app.route("/projects/")
def projects():
    return "<h1>Danh sách dự án sinh viên</h1>"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 6-7',
          codeSnippet: '@app.route("/") \\n @app.route("/home")',
          explanation: 'Chồng 2 decorator lên nhau giúp một view function có thể phục vụ cả 2 đường dẫn "/" và "/home".'
        },
        {
          lineRange: 'Dòng 12',
          codeSnippet: '@app.route("/projects/")',
          explanation: 'Định nghĩa route theo kiểu thư mục (canonical URL). Dù người dùng gõ /projects hay /projects/, Flask vẫn điều hướng chính xác.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/home',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<h1>Chào mừng đến Trang chủ!</h1>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:15:20] "GET /home HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-6',
        question: 'Có thể gắn nhiều decorator @app.route() lên cùng một hàm Python được không?',
        options: [
          { letter: 'A', text: 'Hoàn toàn được, giúp nhiều URL dẫn đến cùng một trang' },
          { letter: 'B', text: 'Không được, Flask sẽ báo lỗi SyntaxError' },
          { letter: 'C', text: 'Chỉ được tối đa 2 route' },
          { letter: 'D', text: 'Phải cài thêm plugin bên ngoài mới làm được' }
        ],
        correctLetter: 'A',
        explanation: 'Hoàn toàn được! Bạn có thể khai báo bao nhiêu route tùy thích phía trên một view function.'
      },
      practice: {
        id: 'prac-6',
        title: 'Tạo hệ thống Menu Route cơ bản',
        taskDescription: 'Tạo các route: trang chủ, tin tức (/news), và liên hệ (/contact).',
        requirements: [
          'Hỗ trợ cả / và /trang-chu cho trang chủ',
          'Route /news trả về danh sách 3 tin mới',
          'Route /contact trả về số điện thoại và email'
        ],
        hints: ['Sử dụng thẻ HTML <ul> và <li> bên trong chuỗi return'],
        sampleCode: `from flask import Flask

app = Flask(__name__)

@app.route("/")
@app.route("/trang-chu")
def index():
    return "Trang chủ Tin tức Công nghệ"

@app.route("/news")
def news():
    return "<ul><li>Flask 3.0 ra mắt</li><li>Python 3.12 mới</li></ul>"

@app.route("/contact")
def contact():
    return "Email: support@truongcaodang.edu.vn"`,
        expectedResult: 'Mỗi route trả về nội dung tương ứng khi gõ trên trình duyệt.',
        expansionTasks: ['Thêm thẻ <a> để tạo liên kết chuyển qua lại giữa các trang.']
      },
      quizzes: [
        {
          id: 'q4-1',
          lessonId: 'lesson-4',
          questionText: 'Trong Flask, điều gì xảy ra nếu route khai báo là `@app.route("/about")` và người dùng truy cập URL `/about/`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Flask vẫn hiển thị bình thường', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Flask trả về lỗi 404 Not Found', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Flask tự động tạo thư mục about', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Trình duyệt bị treo', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Nếu route không có trailing slash, Flask xem nó như một file cụ thể; thêm slash phía sau sẽ dẫn đến 404.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q4-2',
          lessonId: 'lesson-4',
          questionText: 'Lợi ích của việc khai báo nhiều decorator @app.route() cho cùng một view function là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Tăng gấp đôi tốc độ tải trang', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Cho phép người dùng vào cùng một trang qua nhiều alias URL khác nhau (ví dụ: "/" và "/index")', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Giúp tự động dịch website sang nhiều ngôn ngữ', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Giúp mã hóa cơ sở dữ liệu', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Multiple routes cho phép tạo các đường dẫn thay thế (alias) mà không phải lặp lại logic code.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q4-3',
          lessonId: 'lesson-4',
          questionText: 'Thành phần nào chịu trách nhiệm biên dịch và khớp nối URL trong kiến trúc lõi của Flask?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Jinja2 Parser', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Werkzeug Routing Map', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'SQLite Engine', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Bcrypt Hash', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Werkzeug cung cấp hệ thống Routing Map xử lý regex và so khớp URL cực nhanh.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q4-4',
          lessonId: 'lesson-4',
          questionText: 'Mã trạng thái HTTP trả về mặc định khi một view function chạy thành công trong Flask là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: '201 Created', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '200 OK', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '302 Found', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '204 No Content', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask tự động gán HTTP status code 200 OK nếu bạn không chỉ định mã nào khác.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q4-5',
          lessonId: 'lesson-4',
          questionText: 'Nếu muốn chỉ định rõ mã trạng thái trả về là 201 cùng với chuỗi kết quả, ta viết như thế nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'return "Thành công", 201', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'return 201("Thành công")', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'return response(status=201, "Thành công")', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'app.set_status(201)', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Flask cho phép trả về một tuple dạng (response_body, status_code). Cú pháp: `return "Thành công", 201`.',
          difficulty: 'Vận dụng'
        }
      ]
    },
    {
      id: 'lesson-5',
      moduleId: 'module-2',
      lessonNumber: 5,
      title: 'Bài 5. Dynamic Routes & URL Converters',
      slug: 'dynamic-routes-va-url-converters',
      orderIndex: 5,
      isPublished: true,
      objectives: [
        'Nắm vững cú pháp tạo biến trong route `<variable_name>`',
        'Sử dụng các converters có sẵn: `string`, `int`, `float`, `path`, `uuid`',
        'Truyền tham số từ URL vào biến của view function một cách an toàn',
        'Ngăn chặn lỗi kiểu dữ liệu và tự động kích hoạt 404 khi tham số sai kiểu'
      ],
      concepts: [
        {
          title: 'Dynamic Route là gì?',
          definition: 'Route động là route chứa các phần biến đổi có thể nhận giá trị bất kỳ từ URL mà người dùng yêu cầu.',
          explanation: 'Thay vì viết hàng nghìn route cho từng sinh viên `/user/1`, `/user/2`..., bạn chỉ cần viết 1 route duy nhất: `@app.route("/user/<int:user_id>")`.'
        },
        {
          title: 'Các kiểu URL Converter',
          definition: 'Bộ chuyển đổi kiểu dữ liệu ép kiểu giá trị từ chuỗi trên thanh địa chỉ sang kiểu biến Python tương ứng.',
          explanation: 'Các converter chính:\n- `string`: Mặc định, nhận chuỗi bất kỳ không có dấu gạch chéo.\n- `int`: Chấp nhận số nguyên dương.\n- `float`: Chấp nhận số thực có dấu chấm.\n- `path`: Chấp nhận chuỗi kể cả dấu gạch chéo.\n- `uuid`: Chấp nhận chuỗi định danh chuẩn UUID.'
        }
      ],
      codeExample: {
        filename: 'dynamic_demo.py',
        language: 'python',
        code: `from flask import Flask

app = Flask(__name__)

# Nhận tên người dùng dạng chuỗi
@app.route("/user/<username>")
def show_user(username):
    return f"Hồ sơ sinh viên: {username}"

# Nhận mã sinh viên dạng số nguyên
@app.route("/student/<int:student_id>")
def show_student(student_id):
    return f"Đang xem thông tin sinh viên có Mã ID: {student_id}"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 6',
          codeSnippet: '@app.route("/user/<username>")',
          explanation: 'Khai báo biến <username>. Giá trị trên URL tại vị trí này sẽ được gán vào tham số cùng tên của hàm show_user(username).'
        },
        {
          lineRange: 'Dòng 11',
          codeSnippet: '@app.route("/student/<int:student_id>")',
          explanation: 'Sử dụng converter <int:...>. Nếu người dùng gõ /student/abc, Flask sẽ tự động trả về 404 vì "abc" không phải là số nguyên.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/student/102',
        expectedStatus: 200,
        responseType: 'text',
        responsePreview: 'Đang xem thông tin sinh viên có Mã ID: 102',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:20:00] "GET /student/102 HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-7',
        question: 'Nếu người dùng truy cập /student/flask_hoc khi route là @app.route("/student/<int:id>"), chuyện gì xảy ra?',
        options: [
          { letter: 'A', text: 'Server báo lỗi 500 Crash' },
          { letter: 'B', text: 'Flask tự động trả về 404 Not Found vì không ép kiểu sang số nguyên được' },
          { letter: 'C', text: 'Biến id nhận giá trị 0' },
          { letter: 'D', text: 'Flask tự động tạo trang mới' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! URL converter hoạt động như một bộ lọc validation. Nếu dữ liệu không thỏa mãn, Flask coi như không tìm thấy route (404).'
      },
      practice: {
        id: 'prac-7',
        title: 'Xây dựng Route tra cứu Điểm sinh viên',
        taskDescription: 'Tạo route /score/<string:name>/<float:grade> để hiển thị xếp loại.',
        requirements: [
          'Nhận tên sinh viên dạng string và điểm dạng float',
          'Nếu grade >= 5.0 hiển thị "Đạt", ngược lại hiển thị "Cần cố gắng"'
        ],
        hints: ['Dùng câu lệnh if grade >= 5.0 trong view function'],
        sampleCode: `from flask import Flask

app = Flask(__name__)

@app.route("/score/<string:name>/<float:grade>")
def check_score(name, grade):
    status = "Đạt" if grade >= 5.0 else "Cần cố gắng"
    return f"Sinh viên: {name} - Điểm: {grade} - Kết quả: {status}"`,
        expectedResult: 'Truy cập /score/Minh/8.5 trả về "Sinh viên: Minh - Điểm: 8.5 - Kết quả: Đạt".',
        expansionTasks: ['Mở rộng thêm xếp loại Xuất sắc cho điểm >= 9.0']
      },
      quizzes: [
        {
          id: 'q5-1',
          lessonId: 'lesson-5',
          questionText: 'Để chỉ định một biến URL trong Flask bắt buộc phải là số nguyên dương, cú pháp nào đúng?',
          options: [
            { id: 'opt-1', letter: 'A', text: '<integer:id>', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '<int:id>', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '[int:id]', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '{id:number}', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '<int:variable_name> là cú pháp chuẩn của Flask converter cho số nguyên.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q5-2',
          lessonId: 'lesson-5',
          questionText: 'Kiểu converter nào cho phép nhận chuỗi chứa cả dấu gạch chéo `/` (ví dụ đường dẫn thư mục)?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'string', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'path', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'all', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'any', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Converter `path` chấp nhận dấu gạch chéo, rất hữu ích khi làm chức năng quản lý file hoặc cây thư mục.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q5-3',
          lessonId: 'lesson-5',
          questionText: 'Tên tham số truyền vào view function phải như thế nào so với tên biến khai báo trong @app.route()?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Bắt buộc phải trùng tên chính xác', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Khác tên cũng được, Flask tự gán theo thứ tự', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Phải viết hoa tất cả ký tự', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Không được dài quá 5 ký tự', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Tên biến trong route ví dụ `<post_id>` bắt buộc phải trùng với tên đối số của hàm `def view(post_id):`.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q5-4',
          lessonId: 'lesson-5',
          questionText: 'Nếu không ghi converter (ví dụ chỉ ghi `@app.route("/user/<name>")`), Flask mặc định dùng converter nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'int', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'string', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'path', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'text', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Mặc định khi không chỉ rõ converter, Flask áp dụng converter string (chuỗi không chứa dấu /).',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q5-5',
          lessonId: 'lesson-5',
          questionText: 'Để tránh lỗi bảo mật XSS khi hiển thị dữ liệu do người dùng đưa vào URL ra màn hình HTML, ta nên làm gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Dùng markupsafe.escape() hoặc render qua Jinja2 template tự động escape', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Xóa toàn bộ ký tự trong chuỗi', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Không làm gì vì Flask đã tự tắt mạng', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Ép kiểu chuỗi sang số nguyên', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'markupsafe.escape(user_input) chuyển các ký tự độc hại như <, > thành thực thể HTML, bảo vệ an toàn website.',
          difficulty: 'Vận dụng'
        }
      ]
    },
    {
      id: 'lesson-6',
      moduleId: 'module-2',
      lessonNumber: 6,
      title: 'Bài 6. Xây dựng liên kết với url_for()',
      slug: 'xay-dung-lien-ket-voi-url-for',
      orderIndex: 6,
      isPublished: true,
      objectives: [
        'Hiểu vì sao không nên "hard-code" URL tĩnh trong ứng dụng',
        'Sử dụng hàm url_for() để sinh URL động theo tên view function',
        'Truyền tham số động và query parameters vào url_for()',
        'Tạo liên kết đến file tài nguyên tĩnh (CSS, JS, Hình ảnh)'
      ],
      concepts: [
        {
          title: 'Hàm url_for() là gì?',
          definition: 'url_for() là hàm của Flask dùng để sinh ra URL tương ứng với một hàm view cụ thể (Reverse Routing).',
          explanation: 'Thay vì viết cứng href="/user/profile", bạn gọi url_for("profile"). Nếu sau này bạn đổi URL thành "/tai-khoan/ca-nhan", bạn chỉ sửa ở decorator mà toàn bộ liên kết trong hệ thống không hề bị gãy!'
        },
        {
          title: 'Liên kết tới Static Files',
          definition: 'Cú pháp đặc biệt `url_for("static", filename="style.css")` giúp liên kết chuẩn xác đến thư mục static.',
          explanation: 'Flask tự động xử lý tiền tố URL tĩnh, quản lý caching và tương thích hoàn hảo khi deploy trên sub-folder hoặc CDN.'
        }
      ],
      codeExample: {
        filename: 'url_for_demo.py',
        language: 'python',
        code: `from flask import Flask, url_for

app = Flask(__name__)

@app.route("/")
def index():
    # Sinh URL cho hàm show_user với tham số username
    user_url = url_for("show_user", username="nguyen_van_a")
    return f'<a href="{user_url}">Xem hồ sơ của Nguyễn Văn A</a>'

@app.route("/user/<username>")
def show_user(username):
    return f"Trang cá nhân của: {username}"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 1',
          codeSnippet: 'from flask import Flask, url_for',
          explanation: 'Import hàm tiện ích url_for từ thư viện flask.'
        },
        {
          lineRange: 'Dòng 8',
          codeSnippet: 'url_for("show_user", username="nguyen_van_a")',
          explanation: 'Tham số đầu tiên là TÊN HÀM (dạng chuỗi string), các tham số sau là giá trị tương ứng của biến route.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<a href="/user/nguyen_van_a">Xem hồ sơ của Nguyễn Văn A</a>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:25:00] "GET / HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-9',
        question: 'Đối số đầu tiên truyền vào hàm url_for() là gì?',
        options: [
          { letter: 'A', text: 'Đường dẫn URL ví dụ "/user/detail"' },
          { letter: 'B', text: 'Tên của View Function (dưới dạng chuỗi)' },
          { letter: 'C', text: 'Tên database table' },
          { letter: 'D', text: 'Mã lỗi HTTP' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! url_for nhận tên của hàm Python (endpoint name), sau đó tra cứu ngược ra URL tương ứng.'
      },
      practice: {
        id: 'prac-9',
        title: 'Tạo thanh điều hướng động bằng url_for()',
        taskDescription: 'Viết view function trang chủ sinh ra menu gồm liên kết tới trang chủ và trang sinh viên với ID=123.',
        requirements: [
          'Sử dụng url_for() cho tất cả các thẻ liên kết',
          'Không được viết cứng /student/123 trong chuỗi HTML'
        ],
        hints: ['url_for("view_student", student_id=123)'],
        sampleCode: `from flask import Flask, url_for

app = Flask(__name__)

@app.route("/")
def home():
    link_home = url_for("home")
    link_student = url_for("student_detail", student_id=123)
    return f'<nav><a href="{link_home}">Trang chủ</a> | <a href="{link_student}">Sinh viên #123</a></nav>'

@app.route("/sinh-vien/<int:student_id>")
def student_detail(student_id):
    return f"Chi tiết sinh viên mang mã: {student_id}"`,
        expectedResult: 'Menu xuất hiện với các URL được sinh tự động chính xác.',
        expansionTasks: ['Thêm một tham số không nằm trong route (ví dụ page=2) để xem url_for tạo thành query string như thế nào.']
      },
      quizzes: [
        {
          id: 'q6-1',
          lessonId: 'lesson-6',
          questionText: 'Tại sao sử dụng url_for() lại tốt hơn việc viết cứng (hard-code) URL trong mã nguồn?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Khi thay đổi đường dẫn URL, ta chỉ cần sửa decorator mà không phải tìm sửa từng file trong dự án', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'url_for() làm web tải nhanh gấp 5 lần', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'url_for() tự động chuyển code sang tiếng Anh', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'url_for() bắt buộc phải có để Flask chạy được', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'url_for giúp tách biệt logic tên hàm và URL, giúp việc refactor và bảo trì code không bị gãy liên kết.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q6-2',
          lessonId: 'lesson-6',
          questionText: 'Nếu truyền một tham số mà route KHÔNG định nghĩa vào `url_for("index", page=2, filter="active")`, Flask sẽ xử lý thế nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Báo lỗi KeyError', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Tự động gắn vào URL dưới dạng Query String: `/index?page=2&filter=active`', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Bỏ qua không hiển thị', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Lưu vào session', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Những tham số không thuộc về dynamic route pattern sẽ được url_for tự động nối vào đuôi URL thành query parameters.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q6-3',
          lessonId: 'lesson-6',
          questionText: 'Cú pháp chuẩn để sinh URL trỏ tới file CSS `css/style.css` nằm trong thư mục static là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'url_for("css", file="style.css")', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'url_for("static", filename="css/style.css")', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'url_for("/static/css/style.css")', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'flask.link_asset("style.css")', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Endpoint đặc biệt "static" kèm theo tham số keyword filename là quy ước chính thức của Flask.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q6-4',
          lessonId: 'lesson-6',
          questionText: 'Nếu muốn sinh ra URL tuyệt đối có cả giao thức và tên miền (ví dụ: https://example.com/user/1), ta thêm tham số nào vào url_for()?',
          options: [
            { id: 'opt-1', letter: 'A', text: '_external=True', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'absolute=True', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'full=True', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '_domain=True', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Tham số `_external=True` yêu cầu Flask sinh URL đầy đủ (full absolute URL), rất cần thiết khi gửi email kích hoạt tài khoản hoặc làm webhook.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q6-5',
          lessonId: 'lesson-6',
          questionText: 'Điều gì xảy ra nếu bạn gọi url_for("khong_ton_tai") với một tên hàm không có trong ứng dụng?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Flask trả về chuỗi rỗng', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Flask ném ra ngoại lệ BuildError', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Server tự động chuyển hướng về trang chủ', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Trình duyệt hiển thị cảnh báo', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Khi endpoint không khớp với bất kỳ route nào, Werkzeug sẽ ném ra lỗi werkzeug.routing.BuildError.',
          difficulty: 'Thông hiểu'
        }
      ]
    }
  ]
};
