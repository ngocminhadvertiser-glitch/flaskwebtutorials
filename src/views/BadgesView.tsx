import React from 'react';
import { Award, CheckCircle2, Clock, Sparkles, GraduationCap, Download } from 'lucide-react';
import { storageService } from '../services/storageService';
import { BadgeCard } from '../components/BadgeCard';

export const BadgesView: React.FC = () => {
  const stats = storageService.calculateStats();
  const attempts = storageService.getQuizAttempts();
  const currentUser = storageService.getCurrentUser();

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 text-white border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
          <Award className="w-4 h-4" />
          <span>Hệ thống Đánh giá Năng lực Nghề nghiệp</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Học bạ Số &amp; Bảng vàng Thành tích
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Ghi nhận quá trình tích lũy kiến thức qua từng Module học liệu số Flask. Hoàn thành toàn bộ các bài trắc nghiệm và thực hành để mở khóa Huy hiệu Flask Master và Chứng nhận hoàn thành.
        </p>
      </div>

      {/* Certificate Preview Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/50 via-white to-amber-100/30 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Chứng chỉ Hoàn thành Học phần
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            CHỨNG NHẬN LẬP TRÌNH FLASK WEB CHUYÊN NGHIỆP
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Chứng nhận học viên: <strong className="text-slate-900 dark:text-white text-base">{currentUser.fullName}</strong> ({currentUser.username})
            đã tham gia học tập và vượt qua các bài kiểm tra đánh giá năng lực lập trình Flask Web.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div>
              Tiến độ hoàn thành: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.completionPercent}%</strong>
            </div>
            <div>
              Điểm trung bình: <strong className="text-amber-600 dark:text-amber-400 font-bold">{stats.avgQuizScore}/100</strong>
            </div>
            <div>
              Xếp loại: <strong className="text-purple-600 dark:text-purple-400 font-bold">{stats.completionPercent >= 80 ? 'Xuất Sắc' : stats.completionPercent >= 50 ? 'Khá' : 'Đang tích lũy'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Bộ Sưu Tập Huy Hiệu ({stats.unlockedBadgesCount}/{stats.badges.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mỗi huy hiệu tương ứng với một kỹ năng chuyên môn được làm chủ.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stats.badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      {/* Quiz History Table */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>Nhật ký Làm Bài Trắc nghiệm ({attempts.length} lượt)</span>
          </h3>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            Chưa có lượt kiểm tra nào được ghi nhận. Hãy vào học một bài và làm bài trắc nghiệm nhé!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Bài học</th>
                  <th className="py-2.5 px-3">Thời gian</th>
                  <th className="py-2.5 px-3">Số câu đúng</th>
                  <th className="py-2.5 px-3">Điểm số</th>
                  <th className="py-2.5 px-3">Kết quả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {att.lessonTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {att.attemptedAt.split('T')[0]} {att.attemptedAt.split('T')[1]?.substring(0, 5)}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {att.correctCount} / {att.totalQuestions}
                    </td>
                    <td className="py-3 px-3 font-bold font-mono">
                      <span className={att.score >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}>
                        {att.score}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {att.score >= 60 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          ĐẠT CHUẨN
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          CẦN ÔN LẠI
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
