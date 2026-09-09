import { Module } from '../../types';

export const MODULE_3: Module = {
  id: 'module-3',
  moduleNumber: 3,
  title: 'MODULE 03 – Request và HTTP Methods',
  description: 'Hiểu cặn kẽ giao thức HTTP, đối tượng request toàn cục trong Flask, phân biệt GET vs POST, nhận Query Parameters và xử lý dữ liệu Form an toàn.',
  icon: 'Zap',
  lessons: [
    {
      id: 'lesson-11',
      moduleId: 'module-3',
      lessonNumber: 11,
      title: 'Bài 11. Đối tượng request & Query Parameters',
      slug: 'doi-tuong-request-va-query-parameters',
      orderIndex: 11,
      isPublished: true,
      objectives: [
        'Hiểu cơ chế Request Context và đối tượng request trong Flask',
        'Sử dụng `request.args` để lấy dữ liệu từ Query String (?key=value)',
        'Sử dụng phương thức `.get()` kèm giá trị mặc định để tránh lỗi KeyError',
        'Ứng dụng làm chức năng tìm kiếm và phân trang sinh viên'
      ],
      concepts: [
        {
          title: 'Đối tượng request trong Flask',
          definition: 'request là một đối tượng ngữ cảnh (Context-local object) chứa tất cả thông tin mà client gửi lên server trong một lượt gọi.',
          explanation: 'Bao gồm: HTTP method, URL, headers, cookie, tham số query, form data, file đính kèm... Bạn chỉ cần `from flask import request` là có thể truy xuất ở bất cứ view function nào.'
        },
        {
          title: 'Query Parameters và `request.args`',
          definition: 'Là các cặp khóa-giá trị được nối sau dấu `?` trên thanh địa chỉ URL (ví dụ: `/search?q=flask&page=1`).',
          explanation: 'Flask lưu trữ các tham số này trong một MultiDict mang tên `request.args`. Ta nên dùng `request.args.get("q", default="")` thay vì `request.args["q"]` để chương trình không bị văng lỗi nếu người dùng không truyền tham số.'
        }
      ],
      codeExample: {
        filename: 'search_demo.py',
        language: 'python',
        code: `from flask import Flask, request

app = Flask(__name__)

@app.route("/search")
def search():
    # Lấy từ khóa tìm kiếm và số trang từ URL
    keyword = request.args.get("q", default="", type=str)
    page = request.args.get("page", default=1, type=int)
    
    return f"Đang tìm từ khóa: '{keyword}' - Trang: {page}"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 1',
          codeSnippet: 'from flask import Flask, request',
          explanation: 'Import đối tượng request từ thư viện flask.'
        },
        {
          lineRange: 'Dòng 8',
          codeSnippet: 'keyword = request.args.get("q", default="", type=str)',
          explanation: 'Lấy giá trị của param "q". Nếu không có trên URL thì lấy giá trị rỗng (""). Tham số type=str đảm bảo kiểu dữ liệu.'
        },
        {
          lineRange: 'Dòng 9',
          codeSnippet: 'page = request.args.get("page", default=1, type=int)',
          explanation: 'Lấy số trang. Ép kiểu tự động sang type=int. Nếu người dùng gõ /search?page=abc, Flask tự gán giá trị mặc định là 1.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/search?q=python&page=2',
        expectedStatus: 200,
        responseType: 'text',
        responsePreview: "Đang tìm từ khóa: 'python' - Trang: 2",
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:30:00] "GET /search?q=python&page=2 HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-11',
        question: 'Tại sao nên dùng `request.args.get("key")` thay vì `request.args["key"]`?',
        options: [
          { letter: 'A', text: 'Vì `.get()` tránh được lỗi sập server (KeyError) nếu người dùng không truyền param đó' },
          { letter: 'B', text: 'Vì `.get()` chạy nhanh hơn 100 lần' },
          { letter: 'C', text: 'Vì `request.args["key"]` bị cấm trong Python 3' },
          { letter: 'D', text: 'Hai cách này hoàn toàn y hệt nhau' }
        ],
        correctLetter: 'A',
        explanation: 'Chính xác! Truy cập trực tiếp bằng ngoặc vuông [] sẽ gây ra lỗi 400 Bad Request / KeyError nếu key không tồn tại.'
      },
      practice: {
        id: 'prac-11',
        title: 'Xây dựng Bộ lọc sinh viên theo Ngành và Năm học',
        taskDescription: 'Tạo route /students nhận tham số `major` (mặc định "CNTT") và `year` (mặc định 2026).',
        requirements: [
          'Sử dụng request.args.get() với giá trị default',
          'Hiển thị thông báo tìm kiếm sinh viên phù hợp ra màn hình'
        ],
        hints: ['request.args.get("major", "CNTT")', 'request.args.get("year", 2026, type=int)'],
        sampleCode: `from flask import Flask, request

app = Flask(__name__)

@app.route("/students")
def filter_students():
    major = request.args.get("major", "Công nghệ thông tin")
    year = request.args.get("year", 2026, type=int)
    return f"Lọc danh sách sinh viên ngành: {major} - Khóa tuyển sinh: {year}"`,
        expectedResult: 'Truy cập /students?major=DienTu&year=2025 hiển thị đúng thông số.',
        expansionTasks: ['Thêm tham số sort="asc" hoặc "desc" để điều khiển thứ tự hiển thị.']
      },
      quizzes: [
        {
          id: 'q11-1',
          lessonId: 'lesson-11',
          questionText: 'Trong Flask, dữ liệu Query Parameters trên URL (sau dấu ?) được lấy qua thuộc tính nào của `request`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'request.form', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'request.args', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'request.query', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'request.params', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'request.args chứa toàn bộ các tham số phân tích được từ Query String của URL.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q11-2',
          lessonId: 'lesson-11',
          questionText: 'Nếu người dùng truy cập `/api/data` mà không truyền tham số `limit`, kết quả của `request.args.get("limit", 10, type=int)` là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Lỗi KeyError', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '10', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'None', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '0', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Tham số thứ 2 là giá trị mặc định (default), khi không tìm thấy key thì giá trị 10 được trả về.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q11-3',
          lessonId: 'lesson-11',
          questionText: 'Đối tượng `request` trong Flask hoạt động theo cơ chế nào để không bị nhầm lẫn giữa các người dùng truy cập cùng lúc?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Global Variable thông thường', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Context Local (Request Context) gắn với từng thread/luồng xử lý riêng biệt', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Lưu vào file text trên ổ cứng', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Gửi qua Bluetooth', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask sử dụng Context Locals (do Werkzeug quản lý) để mỗi luồng request có dữ liệu riêng rẽ, cô lập an toàn.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q11-4',
          lessonId: 'lesson-11',
          questionText: 'Để lấy danh sách nhiều giá trị cùng một khóa (ví dụ: `?tag=python&tag=flask&tag=web`), ta dùng hàm nào của `request.args`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'request.args.get()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'request.args.getlist("tag")', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'request.args.all("tag")', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'request.args.array()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Vì request.args là một ImmutableMultiDict, phương thức `.getlist("key")` trả về danh sách toàn bộ các giá trị của khóa đó.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q11-5',
          lessonId: 'lesson-11',
          questionText: 'Thuộc tính nào của `request` cho biết phương thức HTTP mà client gửi lên (ví dụ: "GET", "POST")?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'request.action', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'request.method', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'request.protocol', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'request.type', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'request.method trả về chuỗi viết hoa đại diện cho HTTP Method (GET, POST, PUT, DELETE...).',
          difficulty: 'Nhận biết'
        }
      ]
    },
    {
      id: 'lesson-16',
      moduleId: 'module-3',
      lessonNumber: 16,
      title: 'Bài 16. Xử lý GET và POST trong cùng một Route',
      slug: 'xu-ly-get-va-post-trong-cung-mot-route',
      orderIndex: 16,
      isPublished: true,
      objectives: [
        'Khai báo tham số `methods=["GET", "POST"]` trong decorator @app.route',
        'Phân luồng xử lý: GET hiển thị Form, POST nhận và xử lý dữ liệu Form',
        'Trích xuất dữ liệu form qua `request.form`',
        'Hiểu nguyên tắc PRG (Post/Redirect/Get) để chống gửi trùng form'
      ],
      concepts: [
        {
          title: 'Khác biệt căn bản giữa GET và POST',
          definition: 'GET dùng để lấy dữ liệu từ server (không làm thay đổi trạng thái, an toàn, tham số lộ trên URL). POST dùng để gửi dữ liệu lên server (thêm mới, cập nhật, dữ liệu nằm ẩn trong HTTP Body).',
          explanation: 'Theo chuẩn bảo mật, các hành động như đăng nhập, nhập điểm, tạo sinh viên bắt buộc phải dùng POST để tránh lộ thông tin và bị tấn công CSRF.'
        },
        {
          title: 'Tổ chức Route 2 trong 1 (GET + POST)',
          definition: 'Mẫu thiết kế kinh điển của Flask: cùng một URL "/login", khi truy cập qua GET sẽ hiển thị form; khi bấm Submit (POST) thì kiểm tra thông tin.',
          explanation: 'Cấu trúc mẫu:\n```python\nif request.method == "POST":\n    # xử lý dữ liệu\nelse:\n    # hiển thị form HTML\n```'
        }
      ],
      codeExample: {
        filename: 'login_route.py',
        language: 'python',
        code: `from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Lấy dữ liệu từ form gửi lên
        username = request.form.get("username")
        password = request.form.get("password")
        
        # Kiểm tra đăng nhập đơn giản
        if username == "sinhvien" and password == "123456":
            return f"Đăng nhập thành công! Xin chào {username}"
        return "Sai tên đăng nhập hoặc mật khẩu!", 401
        
    # Nếu là phương thức GET: hiển thị biểu mẫu
    return '''
        <form method="POST">
            <label>Tài khoản: <input type="text" name="username"></label><br>
            <label>Mật khẩu: <input type="password" name="password"></label><br>
            <button type="submit">Đăng nhập</button>
        </form>
    '''`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 5',
          codeSnippet: '@app.route("/login", methods=["GET", "POST"])',
          explanation: 'Mặc định Flask chỉ chấp nhận GET. Muốn nhận POST, phải chỉ rõ trong tham số methods.'
        },
        {
          lineRange: 'Dòng 7',
          codeSnippet: 'if request.method == "POST":',
          explanation: 'Kiểm tra phương thức của request hiện hành để rẽ nhánh xử lý.'
        },
        {
          lineRange: 'Dòng 9-10',
          codeSnippet: 'username = request.form.get("username")',
          explanation: 'Dùng request.form để lấy dữ liệu từ các thẻ input có thuộc tính name="username".'
        }
      ],
      simulation: {
        method: 'POST',
        endpoint: '/login',
        requestBody: 'username=sinhvien&password=123456',
        expectedStatus: 200,
        responseType: 'text',
        responsePreview: 'Đăng nhập thành công! Xin chào sinhvien',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 09:35:10] "POST /login HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-16',
        question: 'Nếu trong @app.route("/submit") không khai báo tham số methods, Flask mặc định chỉ nhận phương thức nào?',
        options: [
          { letter: 'A', text: 'Nhận cả GET và POST' },
          { letter: 'B', text: 'Chỉ nhận phương thức GET' },
          { letter: 'C', text: 'Chỉ nhận phương thức POST' },
          { letter: 'D', text: 'Không nhận phương thức nào' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Mặc định decorator @app.route chỉ chấp nhận phương thức GET. Truy cập bằng POST sẽ nhận lỗi 405 Method Not Allowed.'
      },
      practice: {
        id: 'prac-16',
        title: 'Xây dựng Form Phản hồi sinh viên (Feedback)',
        taskDescription: 'Tạo route /feedback hỗ trợ GET để nhập đánh giá môn học và POST để ghi nhận phản hồi.',
        requirements: [
          'methods=["GET", "POST"]',
          'Lấy `student_name` và `rating` từ request.form',
          'Trả về thông báo cảm ơn đã đóng góp ý kiến'
        ],
        hints: ['name="student_name" trong thẻ input', 'request.form.get("rating")'],
        sampleCode: `from flask import Flask, request

app = Flask(__name__)

@app.route("/feedback", methods=["GET", "POST"])
def feedback():
    if request.method == "POST":
        name = request.form.get("student_name", "Ẩn danh")
        rating = request.form.get("rating", "5")
        return f"Cảm ơn bạn {name} đã đánh giá {rating} sao cho môn học Flask!"
        
    return '''
        <form method="POST">
            Họ tên: <input type="text" name="student_name"><br>
            Đánh giá: <input type="number" name="rating" min="1" max="5"><br>
            <button type="submit">Gửi đánh giá</button>
        </form>
    '''`,
        expectedResult: 'Form hiển thị khi truy cập, khi submit trả về lời cảm ơn cùng tên sinh viên.',
        expansionTasks: ['Thử nghiệm với thẻ <textarea> cho nội dung góp ý dài.']
      },
      quizzes: [
        {
          id: 'q16-1',
          lessonId: 'lesson-16',
          questionText: 'Nếu người dùng gửi yêu cầu POST đến một route chỉ khai báo `@app.route("/hello")`, mã lỗi HTTP nào sẽ trả về?',
          options: [
            { id: 'opt-1', letter: 'A', text: '404 Not Found', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '405 Method Not Allowed', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '400 Bad Request', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '502 Bad Gateway', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Lỗi 405 xảy ra khi route có tồn tại trên server nhưng không hỗ trợ phương thức HTTP mà client yêu cầu.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q16-2',
          lessonId: 'lesson-16',
          questionText: 'Để lấy dữ liệu gửi từ một HTML Form có `method="POST"`, ta truy xuất qua thuộc tính nào của `request`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'request.args', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'request.form', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'request.body_json', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'request.query_string', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'request.form là dictionary chứa các trường dữ liệu được submit từ biểu mẫu form theo chuẩn url-encoded hoặc multipart.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q16-3',
          lessonId: 'lesson-16',
          questionText: 'Khóa (key) trong `request.form.get("key")` tương ứng với thuộc tính nào của thẻ HTML input trong form?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Thuộc tính id', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Thuộc tính name', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Thuộc tính class', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Thuộc tính placeholder', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Trình duyệt chỉ đóng gói dữ liệu của các phần tử form có khai báo thuộc tính `name`.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q16-4',
          lessonId: 'lesson-16',
          questionText: 'Mô hình PRG (Post/Redirect/Get) trong lập trình web nhằm giải quyết vấn đề gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Tăng độ phân giải hình ảnh', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Tránh việc người dùng nhấn F5 (Refresh) làm gửi lại dữ liệu form nhiều lần (Double Submit)', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Tự động tạo backup cơ sở dữ liệu', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Bảo mật mật khẩu sinh viên', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Sau khi xử lý POST thành công, server redirect (chuyển hướng 302) sang trang GET để bảo đảm việc refresh trang không gây nộp trùng dữ liệu.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q16-5',
          lessonId: 'lesson-16',
          questionText: 'Hàm nào của Flask được dùng để chuyển hướng người dùng sang một trang khác sau khi xử lý POST thành công?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'forward()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'redirect()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'navigate()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'transfer()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Cú pháp chuẩn: `return redirect(url_for("success_page"))`.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};
