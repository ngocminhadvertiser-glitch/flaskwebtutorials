import React, { useState } from 'react';
import {
  Users,
  Download,
  Award,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  HelpCircle,
  Eye
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { ALL_MODULES, ALL_LESSONS } from '../data';

export const AdminView: React.FC = () => {
  const overview = storageService.getAdminOverview();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState<string>(ALL_MODULES[0].id);

  const handleExportCSV = () => {
    const csvContent = storageService.exportStudentsCSV();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bao_Cao_Tien_Do_Lop_Flask_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const currentMod = ALL_MODULES.find(m => m.id === selectedModuleForQuiz) || ALL_MODULES[0];

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Users className="w-4 h-4" />
            <span>Cổng Quản lý Dành riêng cho Giảng viên</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Quản trị Lớp học &amp; Theo dõi Tiến độ Sinh viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Theo dõi tỷ lệ hoàn thành bài tập, điểm trắc nghiệm trung bình và kết xuất bảng điểm môn Lập trình Flask Web.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{downloadSuccess ? 'Đã tải file CSV!' : 'Xuất Báo cáo Điểm (CSV)'}</span>
        </button>
      </div>

      {/* Class Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Tổng số sinh viên lớp</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {overview.totalStudents} sinh viên
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Lớp CD24-WEB-01
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Tiến độ trung bình lớp</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {overview.avgClassProgress}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${overview.avgClassProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Điểm Quiz trung bình lớp</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {overview.avgClassScore} / 100
          </div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            Mức học lực: Giỏi
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Lượt nộp bài trắc nghiệm</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {overview.totalQuizAttempts} lượt
          </div>
          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
            100% tự động chấm
          </span>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Danh sách Sinh viên &amp; Tiến trình Học tập
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dữ liệu được đồng bộ trực tiếp từ các lượt học và làm bài của sinh viên.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Họ và tên</th>
                <th className="py-2.5 px-3">Tài khoản</th>
                <th className="py-2.5 px-3">Email liên hệ</th>
                <th className="py-2.5 px-3">Tiến độ</th>
                <th className="py-2.5 px-3">Điểm TB Quiz</th>
                <th className="py-2.5 px-3">Số bài xong</th>
                <th className="py-2.5 px-3">Đánh giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {overview.studentsList.map((item) => (
                <tr key={item.user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {item.user.fullName.charAt(0)}
                    </span>
                    <span>{item.user.fullName}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {item.user.username}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {item.user.email}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${item.progressRate}%` }}
                        ></div>
                      </div>
                      <span className="font-bold">{item.progressRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold font-mono text-amber-600 dark:text-amber-400">
                    {item.avgQuiz}/100
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {item.completedCount}/{ALL_LESSONS.length} bài
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.progressRate >= 80
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.progressRate >= 50
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {item.progressRate >= 80 ? 'Tiến độ Tốt' : item.progressRate >= 50 ? 'Đang theo kịp' : 'Cần nhắc nhở'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Question Bank Inspector */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>Ngân hàng Câu hỏi Trắc nghiệm 11 Module</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Giảng viên có thể duyệt lại toàn bộ các câu hỏi trắc nghiệm và lời giải thích sư phạm.
            </p>
          </div>

          {/* Module Selector */}
          <select
            value={selectedModuleForQuiz}
            onChange={(e) => setSelectedModuleForQuiz(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
          >
            {ALL_MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                Module {m.moduleNumber < 10 ? `0${m.moduleNumber}` : m.moduleNumber}: {m.title.replace(/MODULE \d+ – /, '')}
              </option>
            ))}
          </select>
        </div>

        {/* List of quizzes in selected module */}
        <div className="space-y-4 pt-2">
          {currentMod.lessons.map((lesson) => (
            <div key={lesson.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {lesson.title} ({lesson.quizzes.length} câu hỏi)
              </h4>

              <div className="space-y-2">
                {lesson.quizzes.map((q, idx) => (
                  <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-medium">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        Câu {idx + 1}: {q.questionText}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Đáp án đúng: <strong className="text-emerald-600 dark:text-emerald-400">{q.correctLetter}</strong>
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] italic">
                      Giải thích: {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
