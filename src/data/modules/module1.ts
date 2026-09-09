import { Module } from '../../types';

export const MODULE_1: Module = {
  id: 'module-1',
  moduleNumber: 1,
  title: 'MODULE 01 – Làm quen với Flask',
  description: 'Khám phá triết lý Micro-framework của Flask, cách thức hoạt động của ứng dụng web WSGI và tạo ứng dụng Hello World đầu tiên.',
  icon: 'Rocket',
  lessons: [
    {
      id: 'lesson-1',
      moduleId: 'module-1',
      lessonNumber: 1,
      title: 'Bài 1. Flask là gì?',
      slug: 'flask-la-gi',
      orderIndex: 1,
      isPublished: true,
      objectives: [
        'Hiểu định nghĩa Flask là một Micro-framework viết bằng Python',
        'Phân biệt sự khác biệt cốt lõi giữa Flask (Micro) và Django (Full-stack)',
        'Nắm vững 2 thư viện nền tảng tạo nên sức mạnh của Flask: Werkzeug và Jinja2',
        'Biết rõ các tình huống thực tế nên chọn Flask trong giáo dục và doanh nghiệp'
      ],
      concepts: [
        {
          title: 'Khái niệm Micro-framework',
          definition: 'Micro-framework là framework web giữ phần lõi đơn giản, gọn nhẹ nhưng có khả năng mở rộng không giới hạn thông qua các tiện ích bổ sung (extensions).',
          explanation: 'Flask không ép buộc bạn phải dùng một database cụ thể nào, không có sẵn hệ thống chứng thực phức tạp. Bạn chỉ cài đặt và sử dụng đúng những gì dự án cần. Điều này cực kỳ lý tưởng cho sinh viên mới học lập trình web để nắm bản chất thay vì bị ngợp bởi cấu hình.',
          whenToUse: 'Dùng khi xây dựng REST API, ứng dụng web vừa và nhỏ, microservices hoặc làm đồ án môn học.',
          notes: [
            'Flask được tạo bởi Armin Ronacher vào năm 2010 thuộc tổ chức Pallets Projects.',
            '"Micro" không có nghĩa là Flask thiếu tính năng hay yếu, mà có nghĩa là "lõi tinh gọn" (simple by default).'
          ]
        },
        {
          title: 'Hai trụ cột của Flask: Werkzeug & Jinja2',
          definition: 'Werkzeug đảm nhiệm xử lý giao thức web WSGI và định tuyến URL, trong khi Jinja2 là template engine chịu trách nhiệm hiển thị giao diện HTML.',
          explanation: 'Khi có một request gửi tới, Werkzeug sẽ bóc tách URL, header, tham số. Sau đó, code Python của bạn xử lý dữ liệu và nhờ Jinja2 render thành trang web HTML sinh động gửi trả lại trình duyệt.'
        }
      ],
      codeExample: {
        filename: 'app.py',
        language: 'python',
        code: `# Ứng dụng Flask tối giản nhất
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>Chào mừng bạn đến với Lập trình Web Flask!</h1>"`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 2',
          codeSnippet: 'from flask import Flask',
          explanation: 'Import class Flask đại diện cho ứng dụng Web từ thư viện flask.'
        },
        {
          lineRange: 'Dòng 4',
          codeSnippet: 'app = Flask(__name__)',
          explanation: 'Khởi tạo đối tượng ứng dụng (WSGI application). Tham số __name__ giúp Flask xác định đường dẫn gốc để tìm templates và static files.'
        },
        {
          lineRange: 'Dòng 6-7',
          codeSnippet: '@app.route("/") \\n def index():',
          explanation: 'Decorator route khai báo đường dẫn gốc ("/") sẽ được điều khiển bởi hàm index().'
        },
        {
          lineRange: 'Dòng 8',
          codeSnippet: 'return "<h1>Chào mừng bạn...</h1>"',
          explanation: 'Giá trị trả về sẽ được chuyển thành HTTP Response body gửi về trình duyệt với mã trạng thái 200 OK.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/',
        expectedStatus: 200,
        responseType: 'html',
        responsePreview: '<h1>Chào mừng bạn đến với Lập trình Web Flask!</h1>',
        serverConsoleLog: [
          '* Serving Flask app "app"',
          '* Debug mode: off',
          '* Running on http://127.0.0.1:5000',
          '127.0.0.1 - - [09/Sep/2026 08:30:15] "GET / HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-1',
        question: 'Từ "Micro" trong định nghĩa Micro-framework của Flask có ý nghĩa gì?',
        options: [
          { letter: 'A', text: 'Flask chỉ chạy được trên các máy tính cấu hình siêu nhỏ (vi mạch)' },
          { letter: 'B', text: 'Lõi của Flask gọn nhẹ, tối giản và để lập trình viên tự do mở rộng' },
          { letter: 'C', text: 'Flask không thể kết nối cơ sở dữ liệu' },
          { letter: 'D', text: 'Chỉ lập trình được tối đa 5 trang web' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! "Micro" nghĩa là core của Flask giữ sự đơn giản, không áp đặt cấu trúc cứng nhắc, giúp sinh viên kiểm soát được từng dòng code.'
      },
      practice: {
        id: 'prac-1',
        title: 'Cài đặt tư duy về Flask Micro-framework',
        taskDescription: 'Quan sát cấu trúc cơ bản của một trang Flask và ghi nhận 2 thành phần trụ cột nền tảng.',
        requirements: [
          'Đọc hiểu cấu trúc 8 dòng đầu tiên của Flask',
          'Phân biệt được nhiệm vụ của Werkzeug và Jinja2',
          'Chạy thử giả lập để xem phản hồi HTTP trả về'
        ],
        hints: [
          'Werkzeug xử lý tầng giao thức mạng WSGI và routing',
          'Jinja2 xử lý render giao diện người dùng HTML'
        ],
        sampleCode: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello():\n    return "Học Flask thật dễ hiểu!"`,
        expectedResult: 'Dòng chữ "Học Flask thật dễ hiểu!" xuất hiện trên nền trắng trình duyệt khi truy cập cổng 5000.',
        expansionTasks: [
          'Hãy suy nghĩ xem nếu muốn trả về file HTML riêng thì Flask cần thư viện gì?',
          'Tìm hiểu thêm về tổ chức Pallets Projects trên GitHub.'
        ]
      },
      quizzes: [
        {
          id: 'q1-1',
          lessonId: 'lesson-1',
          questionText: 'Flask được xếp vào loại framework nào sau đây trong hệ sinh thái Python?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Full-stack Monolithic Framework', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Micro-framework', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Static Site Generator', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Desktop GUI Toolkit', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask là một Micro-framework nổi tiếng với triết lý gọn nhẹ, linh hoạt và dễ mở rộng.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q1-2',
          lessonId: 'lesson-1',
          questionText: 'Hai thư viện nền tảng cốt lõi được Flask tích hợp sẵn bên dưới là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'NumPy và Pandas', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Werkzeug và Jinja2', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Django ORM và Celery', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Pygame và Tkinter', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Werkzeug đảm nhiệm WSGI utility và routing, còn Jinja2 là template engine mạnh mẽ.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q1-3',
          lessonId: 'lesson-1',
          questionText: 'Điểm khác biệt lớn nhất giữa Flask và Django đối với người mới bắt đầu là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Django viết bằng PHP còn Flask viết bằng Python', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Flask tối giản, không ép buộc cấu trúc; còn Django bao gồm sẵn admin, ORM theo phong cách "Batteries-included"', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Flask không chạy được trên Linux', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Django chỉ làm được ứng dụng tĩnh', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Django có sẵn mọi thứ (batteries-included) nên phức tạp ban đầu, trong khi Flask tối giản cho phép học từng phần dễ dàng.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q1-4',
          lessonId: 'lesson-1',
          questionText: 'Khi nào nên ưu tiên chọn Flask cho dự án phần mềm?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Khi cần xây dựng REST API, Microservice hoặc ứng dụng cần sự tùy biến cao', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Khi muốn làm game 3D trực tuyến nặng', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Khi bắt buộc phải có sẵn giao diện Admin đồ sộ ngay lập tức mà không muốn code', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chỉ khi không thể cài đặt được Python', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Flask cực kỳ linh hoạt và nhẹ, rất phù hợp làm REST API, microservices và hệ thống giáo dục.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q1-5',
          lessonId: 'lesson-1',
          questionText: 'Tổ chức mã nguồn mở nào hiện đang quản lý và phát triển Flask?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Apache Foundation', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Pallets Projects', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Mozilla Corporation', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Oracle', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Flask thuộc hệ sinh thái Pallets Projects, cùng với Jinja, Werkzeug, Click và ItsDangerous.',
          difficulty: 'Nhận biết'
        }
      ]
    },
    {
      id: 'lesson-4',
      moduleId: 'module-1',
      lessonNumber: 4,
      title: 'Bài 4. Tạo Flask Application đầu tiên',
      slug: 'tao-flask-application-dau-tien',
      orderIndex: 4,
      isPublished: true,
      objectives: [
        'Khởi tạo thành công một đối tượng Flask instance với biến __name__',
        'Sử dụng decorator @app.route() để tạo điểm kết nối URL',
        'Viết view function trả về dữ liệu chuỗi hoặc HTML',
        'Hiểu cơ chế ánh xạ từ Request URL đến View Function trong Flask'
      ],
      concepts: [
        {
          title: 'Khởi tạo đối tượng Flask',
          definition: 'app = Flask(__name__) tạo ra một instance đại diện cho toàn bộ website của bạn.',
          explanation: 'Biến đặc biệt __name__ trong Python sẽ mang giá trị "__main__" nếu file được chạy trực tiếp. Flask dùng giá trị này để xác định thư mục gốc của project (root path), từ đó tự động tìm thấy các file giao diện HTML trong thư mục templates/ và file tĩnh trong static/.',
          whenToUse: 'Bắt buộc phải có ở file khởi tạo của mọi ứng dụng Flask.',
          notes: [
            'Luôn đặt tên biến phổ biến là `app` theo quy ước quốc tế.',
            'Nếu truyền sai tên module, Flask có thể không tìm thấy templates sau này.'
          ]
        },
        {
          title: 'Decorator @app.route()',
          definition: 'Decorator là một cú pháp của Python (@) dùng để gắn kết một URL cụ thể với một hàm Python xử lý (View function).',
          explanation: 'Khi người dùng gõ địa chỉ http://127.0.0.1:5000/ trên trình duyệt, Flask sẽ rà soát danh sách URL rule và gọi đúng hàm `hello()` nằm ngay bên dưới decorator @app.route("/").',
          whenToUse: 'Dùng cho mọi trang hoặc API endpoint bạn muốn tạo ra.'
        },
        {
          title: 'View Function và Giá trị Return',
          definition: 'Hàm xử lý logic và trả về nội dung HTTP Response cho người dùng.',
          explanation: 'Giá trị return của hàm có thể là một chuỗi văn bản thuần (plain text), chuỗi mã HTML, hoặc một JSON object. Trình duyệt sẽ nhận chuỗi này và vẽ lên màn hình.'
        }
      ],
      codeExample: {
        filename: 'app.py',
        language: 'python',
        code: `from flask import Flask

# Khởi tạo đối tượng Flask
app = Flask(__name__)

# Khai báo route cho trang chủ
@app.route("/")
def hello():
    return "Hello World! Xin chào sinh viên Flask!"

# Chạy server khi execute file trực tiếp
if __name__ == "__main__":
    app.run(debug=True, port=5000)`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 1',
          codeSnippet: 'from flask import Flask',
          explanation: 'Dòng này import Flask class từ package flask đã được cài đặt qua pip.'
        },
        {
          lineRange: 'Dòng 4',
          codeSnippet: 'app = Flask(__name__)',
          explanation: 'Tạo một instance của Flask. Biến __name__ là biến đặc biệt của Python cho biết tên file/module hiện hành.'
        },
        {
          lineRange: 'Dòng 7',
          codeSnippet: '@app.route("/")',
          explanation: 'Decorator của Flask nói cho máy chủ biết rằng: khi truy cập vào đường dẫn gốc "/", hãy gọi hàm hello().'
        },
        {
          lineRange: 'Dòng 8-9',
          codeSnippet: 'def hello(): \\n    return "Hello World! Xin chào sinh viên Flask!"',
          explanation: 'Định nghĩa view function. Chuỗi trả về sẽ là nội dung của trang web (Response Body).'
        },
        {
          lineRange: 'Dòng 12-13',
          codeSnippet: 'if __name__ == "__main__": \\n    app.run(debug=True, port=5000)',
          explanation: 'Kiểm tra file có được chạy trực tiếp hay không. app.run() kích hoạt development server tích hợp sẵn ở cổng 5000 với chế độ debug tự tải lại khi sửa code.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/',
        expectedStatus: 200,
        responseType: 'text',
        responsePreview: 'Hello World! Xin chào sinh viên Flask!',
        serverConsoleLog: [
          '* Serving Flask app "app"',
          '* Debug mode: on',
          '* Running on http://127.0.0.1:5000 (Press CTRL+C to quit)',
          '* Restarting with stat',
          '* Debugger is active!',
          '127.0.0.1 - - [09/Sep/2026 09:12:04] "GET / HTTP/1.1" 200 -'
        ]
      },
      quickCheck: {
        id: 'qc-4',
        question: 'Tham số __name__ truyền vào hàm khởi tạo Flask(__name__) có tác dụng chính là gì?',
        options: [
          { letter: 'A', text: 'Đặt tên hiển thị trên thanh tiêu đề của trình duyệt' },
          { letter: 'B', text: 'Giúp Flask định vị thư mục gốc để tải templates và static files' },
          { letter: 'C', text: 'Tạo mật khẩu mã hóa cơ sở dữ liệu' },
          { letter: 'D', text: 'Quy định số lượng người truy cập tối đa' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Flask cần biết module gốc ở đâu trong hệ thống file để tự động tìm thư mục chứa giao diện và tài nguyên tĩnh.'
      },
      practice: {
        id: 'prac-4',
        title: 'Xây dựng trang Web "Hello Student" và trang "/about"',
        taskDescription: 'Tạo một ứng dụng Flask nhỏ với 2 trang web theo yêu cầu chuẩn đầu ra nghề nghiệp.',
        requirements: [
          'Tạo route gốc "/" hiển thị: "Xin chào, tôi là [Họ và tên của bạn] - Sinh viên Lập trình Web"',
          'Tạo thêm route "/about" hiển thị thông điệp: "Đây là trang giới thiệu ứng dụng học tập Flask."',
          'Chạy thử nghiệm trên cổng 5000 với debug=True'
        ],
        hints: [
          'Bước 1: Import Flask class từ module flask',
          'Bước 2: Khởi tạo biến app = Flask(__name__)',
          'Bước 3: Viết 2 hàm view tương ứng với 2 decorator @app.route("/") và @app.route("/about")',
          'Bước 4: Sử dụng khối if __name__ == "__main__": app.run(debug=True)'
        ],
        sampleCode: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Xin chào, tôi là Nguyễn Văn A - Sinh viên Lập trình Web"

@app.route("/about")
def about():
    return "Đây là trang giới thiệu ứng dụng học tập Flask."

if __name__ == "__main__":
    app.run(debug=True, port=5000)`,
        expectedResult: 'Khi mở trình duyệt tới http://127.0.0.1:5000/ thấy lời chào cá nhân hóa; khi mở http://127.0.0.1:5000/about thấy thông tin giới thiệu.',
        expansionTasks: [
          'Thử bọc đoạn chữ trả về trong thẻ HTML <h1> và <p> xem trình duyệt hiển thị thế nào.',
          'Tạo thêm trang "/contact" để hiển thị email liên hệ của bạn.'
        ]
      },
      quizzes: [
        {
          id: 'q4-1',
          lessonId: 'lesson-4',
          questionText: 'Flask sử dụng decorator nào sau đây để liên kết một URL với một view function?',
          options: [
            { id: 'opt-1', letter: 'A', text: '@flask.url()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '@app.route()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '@route.app()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '@web.route()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '@app.route() là decorator chuẩn của Flask dùng để gắn kết endpoint đường dẫn với hàm xử lý Python.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q4-2',
          lessonId: 'lesson-4',
          questionText: 'Trong câu lệnh `app = Flask(__name__)`, từ khóa `__name__` là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Một chuỗi string do người dùng tùy ý nhập', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Biến đặc biệt của Python cho biết tên module hoặc package hiện tại', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Tên miền website đã đăng ký', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Hàm dùng để kết nối database', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '__name__ là biến tích hợp sẵn trong Python, giúp Flask xác định đường dẫn gốc của ứng dụng.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q4-3',
          lessonId: 'lesson-4',
          questionText: 'Nếu bạn truy cập một URL chưa được định nghĩa bằng @app.route(), Flask sẽ trả về mã lỗi HTTP nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: '200 OK', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '404 Not Found', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '500 Internal Server Error', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '301 Moved Permanently', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Khi URL không khớp với bất kỳ route nào đã đăng ký, Flask tự động trả về lỗi 404 Not Found.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q4-4',
          lessonId: 'lesson-4',
          questionText: 'Mục đích chính của tham số `debug=True` trong câu lệnh `app.run(debug=True)` là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Tự động sao lưu cơ sở dữ liệu mỗi 5 phút', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Kích hoạt chế độ gỡ lỗi: tự động tải lại server khi sửa code và hiển thị chi tiết traceback lỗi trên trình duyệt', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Tăng tốc độ máy chủ lên gấp 10 lần cho production', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Chặn tất cả các yêu cầu từ bên ngoài mạng LAN', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'debug=True hỗ trợ phát triển cực nhanh nhờ Auto-reload và Interactive Debugger (Lưu ý: Không bật trên môi trường production).',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q4-5',
          lessonId: 'lesson-4',
          questionText: 'Điều gì xảy ra nếu view function trong Flask không có lệnh `return` hoặc trả về `None`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Flask tự động render trang trắng', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Flask ném ra ngoại lệ TypeError: The view function did not return a valid response', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Flask sẽ lặp vô hạn', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Flask tự động tắt máy chủ', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Mọi view function bắt buộc phải trả về một response hợp lệ (chuỗi string, response object, tuple hoặc dict). Trả về None sẽ gây lỗi TypeError 500.',
          difficulty: 'Vận dụng'
        }
      ]
    },
    {
      id: 'lesson-5',
      moduleId: 'module-1',
      lessonNumber: 5,
      title: 'Bài 5. Chạy Flask Development Server',
      slug: 'chay-flask-development-server',
      orderIndex: 5,
      isPublished: true,
      objectives: [
        'Biết cách khởi động server bằng cả 2 cách: `flask run` và `python app.py`',
        'Thiết lập biến môi trường `FLASK_APP` và `FLASK_DEBUG`',
        'Hiểu ý nghĩa của cổng mặc định 5000 và host 127.0.0.1',
        'Phân biệt rõ ràng giữa Development Server và Production WSGI Server (Gunicorn, uWSGI)'
      ],
      concepts: [
        {
          title: 'Flask CLI và lệnh `flask run`',
          definition: 'Bộ công cụ dòng lệnh đi kèm với Flask cho phép quản trị và khởi động server thuận tiện.',
          explanation: 'Khi cài đặt Flask, một lệnh hệ thống tên là `flask` sẽ sẵn sàng trong terminal. Bạn có thể gõ `flask run` để khởi động máy chủ mà không cần thêm code `if __name__ == "__main__"`.',
          whenToUse: 'Là cách khởi chạy chuẩn được Flask chính thức khuyến nghị.'
        },
        {
          title: 'Cảnh báo an ninh Development Server',
          definition: 'Server tích hợp sẵn trong Flask chỉ được thiết kế cho mục đích học tập và gỡ lỗi cục bộ.',
          explanation: 'Server này xử lý đơn luồng hoặc hạn chế về khả năng chịu tải và bảo mật. Khi đưa lên môi trường thực tế (production), ta phải dùng WSGI HTTP Server như Gunicorn hoặc Waitress đứng sau Nginx.',
          notes: [
            'KHÔNG BAO GIỜ bật debug=True trên máy chủ công khai vì debugger cho phép thực thi mã từ xa qua mã PIN.'
          ]
        }
      ],
      codeExample: {
        filename: 'terminal.sh',
        language: 'bash',
        code: `# Thiết lập file chính cho Flask CLI
export FLASK_APP=app.py

# Bật chế độ debug
export FLASK_DEBUG=1

# Chạy server ở host 0.0.0.0 và port 5000
flask run --host=0.0.0.0 --port=5000`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 2',
          codeSnippet: 'export FLASK_APP=app.py',
          explanation: 'Khai báo biến môi trường chỉ cho Flask CLI biết file khởi đầu của ứng dụng là app.py (trên Windows dùng `set FLASK_APP=app.py`).'
        },
        {
          lineRange: 'Dòng 5',
          codeSnippet: 'export FLASK_DEBUG=1',
          explanation: 'Kích hoạt debug mode qua biến môi trường (tương đương debug=True).'
        },
        {
          lineRange: 'Dòng 8',
          codeSnippet: 'flask run --host=0.0.0.0 --port=5000',
          explanation: 'Lắng nghe trên toàn bộ các card mạng (--host=0.0.0.0) thay vì chỉ localhost, cho phép các thiết bị cùng mạng LAN (hoặc máy ảo) truy cập.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/health',
        expectedStatus: 200,
        responseType: 'json',
        responsePreview: '{"status": "running", "server": "Werkzeug/3.0", "env": "development"}',
        serverConsoleLog: [
          ' * Environment: development',
          ' * Debug mode: on',
          ' * Running on all addresses (0.0.0.0)',
          ' * Running on http://127.0.0.1:5000',
          ' * Running on http://192.168.1.15:5000',
          ' Press CTRL+C to quit'
        ]
      },
      quickCheck: {
        id: 'qc-5',
        question: 'Cổng mặc định mà máy chủ phát triển Flask lắng nghe là cổng nào?',
        options: [
          { letter: 'A', text: 'Cổng 80' },
          { letter: 'B', text: 'Cổng 3306' },
          { letter: 'C', text: 'Cổng 5000' },
          { letter: 'D', text: 'Cổng 8080' }
        ],
        correctLetter: 'C',
        explanation: 'Chính xác! Flask mặc định sử dụng port 5000 (http://127.0.0.1:5000).'
      },
      practice: {
        id: 'prac-5',
        title: 'Cấu hình và khởi chạy Flask CLI',
        taskDescription: 'Thực hành khai báo biến môi trường và chạy ứng dụng ở một cổng tùy chỉnh.',
        requirements: [
          'Chạy server Flask ở cổng 8000 thay vì cổng mặc định 5000',
          'Bật chế độ debug để quan sát log máy chủ'
        ],
        hints: [
          'Dùng cờ --port=8000 trong lệnh flask run',
          'Hoặc truyền port=8000 vào hàm app.run(port=8000)'
        ],
        sampleCode: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Server đang chạy trên cổng 8000!"

if __name__ == "__main__":
    app.run(debug=True, port=8000)`,
        expectedResult: 'Server hiển thị thông báo "Running on http://127.0.0.1:8000" trong console.',
        expansionTasks: [
          'Thử nghiệm đổi host thành "0.0.0.0" và kiểm tra xem có truy cập được từ điện thoại cùng Wi-Fi không.'
        ]
      },
      quizzes: [
        {
          id: 'q5-1',
          lessonId: 'lesson-5',
          questionText: 'Để chạy ứng dụng Flask bằng công cụ CLI chính thức, câu lệnh nào sau đây là chuẩn xác?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'flask run', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'flask start', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'python flask execute', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'flask deploy', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Lệnh `flask run` là câu lệnh mặc định của Flask CLI để khởi động development server.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q5-2',
          lessonId: 'lesson-5',
          questionText: 'Biến môi trường nào dùng để chỉ định file mã nguồn chính khi dùng lệnh `flask run`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'PYTHON_ROOT', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'FLASK_APP', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'FLASK_DATABASE', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'APP_SECRET', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'FLASK_APP dùng để khai báo file hoặc package chứa app Flask (ví dụ: export FLASK_APP=app.py).',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q5-3',
          lessonId: 'lesson-5',
          questionText: 'Tại sao development server của Flask không nên dùng trên môi trường Production thực tế?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Vì Flask không hỗ trợ kết nối mạng Internet', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Vì nó chỉ thiết kế cho môi trường thử nghiệm cục bộ, không tối ưu hiệu năng, bảo mật và khả năng chịu tải cao', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Vì nó tự động xóa code sau 24 giờ', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Vì nó bắt buộc phải trả phí bản quyền', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Development server chỉ phục vụ phát triển. Môi trường production cần WSGI server chuyên nghiệp như Gunicorn, uWSGI.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q5-4',
          lessonId: 'lesson-5',
          questionText: 'Khi gán `--host=0.0.0.0` lúc chạy Flask server, ý nghĩa thực tế là gì?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Chặn hoàn toàn mọi kết nối mạng', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Cho phép server lắng nghe kết nối từ tất cả các địa chỉ IP mạng có trên máy, kể cả thiết bị khác trong mạng LAN', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Chỉ chấp nhận duy nhất máy localhost', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Xóa bỏ cổng kết nối', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '0.0.0.0 chỉ định server bind vào tất cả interfaces mạng hiện có trên máy.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q5-5',
          lessonId: 'lesson-5',
          questionText: 'Tổ hợp phím nào dùng để ngắt (dừng) máy chủ Flask đang chạy trong cửa sổ Terminal/Command Prompt?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Ctrl + Z', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Ctrl + C', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Alt + F4', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Ctrl + Shift + Esc', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Ctrl + C gửi tín hiệu SIGINT để kết thúc tiến trình server đang chạy.',
          difficulty: 'Vận dụng'
        }
      ]
    }
  ]
};
