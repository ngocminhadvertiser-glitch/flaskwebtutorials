import { Module } from '../../types';

export const MODULE_11: Module = {
  id: 'module-11',
  moduleNumber: 11,
  title: 'MODULE 11 – Xử lý Lỗi và Kỹ thuật Debug',
  description: 'Làm chủ kỹ năng xử lý ngoại lệ và lỗi HTTP trong Flask: tạo trang báo lỗi 404 và 500 tùy biến với `@app.errorhandler()`, kỹ thuật đọc Traceback và gỡ lỗi chuyên nghiệp.',
  icon: 'Bug',
  lessons: [
    {
      id: 'lesson-17',
      moduleId: 'module-11',
      lessonNumber: 17,
      title: 'Bài 17. Xử lý lỗi 404 và 500 với @app.errorhandler',
      slug: 'xu-ly-loi-404-va-500-voi-errorhandler',
      orderIndex: 17,
      isPublished: true,
      objectives: [
        'Hiểu tầm quan trọng của trang báo lỗi thân thiện với người dùng (User-friendly error pages)',
        'Sử dụng decorator `@app.errorhandler(404)` để bắt lỗi Not Found',
        'Sử dụng decorator `@app.errorhandler(500)` để bắt lỗi Server Crash',
        'Luôn nhớ trả về mã trạng thái HTTP chính xác ở tuple return trong error handler'
      ],
      concepts: [
        {
          title: 'Decorator @app.errorhandler()',
          definition: 'Là hàm chặn và xử lý khi có một mã lỗi HTTP hoặc ngoại lệ (Exception) xảy ra trong quá trình thực thi request.',
          explanation: 'Thay vì để người dùng nhìn thấy trang trắng hoặc lỗi kỹ thuật khô khan gây bối rối, bạn có thể thiết kế trang 404 sinh động kèm nút "Quay lại Trang chủ" hoặc hộp tìm kiếm bài học.'
        },
        {
          title: 'Quy tắc Return trong Error Handler',
          definition: 'Hàm xử lý lỗi BẮT BUỘC phải nhận một đối số `error` và return kèm theo mã trạng thái HTTP thực sự.',
          explanation: 'Cú pháp chuẩn:\n`return render_template("errors/404.html"), 404`\nNếu bạn quên ghi số 404 ở cuối, trình duyệt và Google Search Console sẽ hiểu nhầm đây là trang thành công 200 (Soft 404), ảnh hưởng xấu đến SEO.'
        }
      ],
      codeExample: {
        filename: 'errors_demo.py',
        language: 'python',
        code: `from flask import Flask, render_template

app = Flask(__name__)

# Bắt lỗi 404: Không tìm thấy trang
@app.errorhandler(404)
def page_not_found(error):
    # Luôn trả về tuple kèm mã 404
    return render_template("errors/404.html", error_message="Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển."), 404

# Bắt lỗi 500: Lỗi nội bộ máy chủ
@app.errorhandler(500)
def internal_server_error(error):
    # Ghi log lỗi vào file nếu cần
    return render_template("errors/500.html", error_message="Hệ thống đang gặp sự cố kỹ thuật, vui lòng thử lại sau!"), 500`
      },
      codeAnalysis: [
        {
          lineRange: 'Dòng 6',
          codeSnippet: '@app.errorhandler(404)',
          explanation: 'Lắng nghe sự kiện HTTP 404 Not Found trên toàn ứng dụng.'
        },
        {
          lineRange: 'Dòng 7',
          codeSnippet: 'def page_not_found(error):',
          explanation: 'Hàm xử lý lỗi bắt buộc phải có một tham số (thường đặt tên là error hoặc e).'
        },
        {
          lineRange: 'Dòng 9',
          codeSnippet: 'return render_template("errors/404.html", ...), 404',
          explanation: 'Trả về giao diện HTML tùy biến cùng mã trạng thái 404 đúng chuẩn giao thức web.'
        }
      ],
      simulation: {
        method: 'GET',
        endpoint: '/duong-dan-khong-ton-tai',
        expectedStatus: 404,
        responseType: 'html',
        responsePreview: '<div class="text-center"><h1>404 - Không tìm thấy bài học</h1><p>Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</p><a href="/" class="btn btn-primary">Về Trang chủ</a></div>',
        serverConsoleLog: [
          '127.0.0.1 - - [09/Sep/2026 10:25:00] "GET /duong-dan-khong-ton-tai HTTP/1.1" 404 -'
        ]
      },
      quickCheck: {
        id: 'qc-17',
        question: 'Điều gì xảy ra nếu bạn viết `return render_template("404.html")` mà quên ghi `, 404` ở cuối?',
        options: [
          { letter: 'A', text: 'Ứng dụng bị sập ngay lập tức' },
          { letter: 'B', text: 'Flask sẽ trả về mã 200 OK (gọi là lỗi Soft 404, gây hại cho SEO và API)' },
          { letter: 'C', text: 'File 404.html bị xóa' },
          { letter: 'D', text: 'Trình duyệt tự động sửa thành 404' }
        ],
        correctLetter: 'B',
        explanation: 'Chính xác! Nếu không chỉ rõ status code, Flask mặc định gán 200 OK. Luôn nhớ thêm `, 404` ở cuối hàm xử lý lỗi.'
      },
      practice: {
        id: 'prac-17',
        title: 'Thiết kế trang 404 chuẩn giao diện EdTech',
        taskDescription: 'Tạo template templates/errors/404.html kế thừa base.html với thông điệp thân thiện và nút quay về danh sách bài học.',
        requirements: [
          'Kế thừa base.html',
          'Hiển thị tiêu đề 404 và hình ảnh minh họa',
          'Nút liên kết về danh sách các Module: url_for("modules")'
        ],
        hints: ['{% extends "base.html" %}', 'href="{{ url_for(\'home\') }}"'],
        sampleCode: `<!-- templates/errors/404.html -->
{% extends "base.html" %}

{% block title %}404 - Không tìm thấy trang{% endblock %}

{% block content %}
<div class="text-center py-5">
    <h1 class="display-1 text-danger font-weight-bold">404</h1>
    <h2>Ối! Trang này không tồn tại</h2>
    <p class="lead">Bài học bạn đang tìm kiếm có thể đã được cập nhật hoặc chuyển sang Module khác.</p>
    <a href="{{ url_for('home') }}" class="btn btn-primary btn-lg mt-3">Quay lại Trang chủ</a>
</div>
{% endblock %}`,
        expectedResult: 'Khi truy cập URL sai, giao diện trang 404 xuất hiện đẹp mắt, không làm đứt gãy trải nghiệm người dùng.',
        expansionTasks: ['Thêm form tìm kiếm nhanh bài học ngay trong trang 404.']
      },
      quizzes: [
        {
          id: 'q17-1',
          lessonId: 'lesson-17',
          questionText: 'Decorator nào trong Flask được dùng để bắt và xử lý mã lỗi HTTP tùy biến?',
          options: [
            { id: 'opt-1', letter: 'A', text: '@app.catch()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: '@app.errorhandler()', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: '@app.handle_exception()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: '@app.on_error()', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: '`@app.errorhandler(status_code_or_exception)` là decorator xử lý lỗi chính thức.',
          difficulty: 'Nhận biết'
        },
        {
          id: 'q17-2',
          lessonId: 'lesson-17',
          questionText: 'Hàm nào của Flask được dùng để chủ động kích hoạt (ném ra) một mã lỗi HTTP lập tức (ví dụ: cấm truy cập 403)?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'stop()', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'abort(403)', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'throw(403)', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'exit(403)', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Hàm `abort(code)` ngay lập tức dừng xử lý và chuyển quyền điều khiển cho errorhandler tương ứng.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q17-3',
          lessonId: 'lesson-17',
          questionText: 'Tại sao trên máy chủ Production, biến `DEBUG` PHẢI luôn được thiết lập là `False`?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Vì bật Debug cho phép bất kỳ ai xem traceback và có thể chạy mã lệnh tùy ý trên server qua Werkzeug PIN (lỗ hổng Remote Code Execution)', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'Vì nó làm tốn điện', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'Vì Flask sẽ tự động tắt sau 1 tiếng', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Không có lý do gì, bật hay tắt như nhau', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: 'Interactive Debugger của Werkzeug cực kỳ nguy hiểm nếu lộ ra ngoài Internet vì cho phép thực thi Python console từ xa.',
          difficulty: 'Vận dụng'
        },
        {
          id: 'q17-4',
          lessonId: 'lesson-17',
          questionText: 'Để ghi nhật ký (logging) các lỗi xảy ra trong ứng dụng vào file để giảng viên/quản trị viên tiện xem lại, Flask tích hợp sẵn module nào?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'app.logger (dựa trên module logging chuẩn của Python)', isCorrect: true },
            { id: 'opt-2', letter: 'B', text: 'file.write()', isCorrect: false },
            { id: 'opt-3', letter: 'C', text: 'print_to_disk()', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'record_error()', isCorrect: false }
          ],
          correctLetter: 'A',
          explanation: '`app.logger.error("...")` là cách ghi log chuẩn hóa và an toàn trong Flask.',
          difficulty: 'Thông hiểu'
        },
        {
          id: 'q17-5',
          lessonId: 'lesson-17',
          questionText: 'Mã lỗi HTTP 500 (Internal Server Error) thường biểu thị điều gì trong code Flask?',
          options: [
            { id: 'opt-1', letter: 'A', text: 'Người dùng gõ sai mật khẩu', isCorrect: false },
            { id: 'opt-2', letter: 'B', text: 'Code Python phía server đã gặp một Exception chưa được xử lý (unhandled exception) như ZeroDivisionError, NameError, v.v.', isCorrect: true },
            { id: 'opt-3', letter: 'C', text: 'Mạng internet bị đứt', isCorrect: false },
            { id: 'opt-4', letter: 'D', text: 'Website đang bảo trì định kỳ', isCorrect: false }
          ],
          correctLetter: 'B',
          explanation: 'Lỗi 500 nghĩa là server bị crash hoặc ném exception trong quá trình xử lý view function.',
          difficulty: 'Nhận biết'
        }
      ]
    }
  ]
};
