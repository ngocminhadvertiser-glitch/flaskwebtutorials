import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Award, RotateCcw, HelpCircle } from 'lucide-react';
import { QuizQuestion, QuizAttempt } from '../types';
import { storageService } from '../services/storageService';

interface QuizSectionProps {
  lessonId: string;
  lessonTitle: string;
  quizzes: QuizQuestion[];
  onQuizCompleted?: (score: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  lessonId,
  lessonTitle,
  quizzes,
  onQuizCompleted
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const handleSelectOption = (questionId: string, letter: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: letter }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quizzes.forEach(q => {
      if (selectedAnswers[q.id] === q.correctLetter) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / quizzes.length) * 100);
    setCorrectCount(correct);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save attempt to storage
    const attempt: QuizAttempt = {
      id: 'attempt-' + Date.now(),
      lessonId,
      lessonTitle,
      attemptedAt: new Date().toISOString(),
      score: calculatedScore,
      totalQuestions: quizzes.length,
      correctCount: correct,
      answers: selectedAnswers
    };
    storageService.saveQuizAttempt(attempt);

    if (onQuizCompleted) {
      onQuizCompleted(calculatedScore);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCorrectCount(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === quizzes.length;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Đánh giá Kiến thức (5 Câu hỏi Chuẩn Đầu ra)</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Trắc nghiệm Củng cố: {lessonTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Đạt từ 60% (3/5 câu đúng) để được công nhận hoàn thành bài học và mở khóa tiến độ tiếp theo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            Đã làm: <strong className="text-emerald-600 dark:text-emerald-400">{answeredCount}</strong>/{quizzes.length}
          </span>
        </div>
      </div>

      {/* Quiz Result Summary Card */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-xl border text-center transition-all animate-fadeIn ${
            score >= 60
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-sm mb-3">
            {score >= 60 ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            )}
          </div>
          <h4 className="text-xl font-bold mb-1">
            {score >= 60 ? 'Chúc mừng bạn đã vượt qua!' : 'Chưa đạt điểm yêu cầu!'}
          </h4>
          <p className="text-sm opacity-90 max-w-md mx-auto mb-4">
            {score >= 60
              ? `Bạn đạt ${score}/100 điểm (${correctCount}/${quizzes.length} câu đúng). Kiến thức bài học này đã được ghi nhận vào học bạ số của bạn.`
              : `Bạn chỉ đạt ${score}/100 điểm (${correctCount}/${quizzes.length} câu đúng). Hãy đọc kỹ phần giải thích chi tiết bên dưới rồi bấm làm lại để nắm vững bài nhé.`}
          </p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại bài kiểm tra</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quizzes.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctLetter;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs">
                    {qIndex + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Cấp độ: {q.difficulty}
                  </span>
                </div>

                {isSubmitted && (
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đúng (+20đ)
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Sai (Đáp án: {q.correctLetter})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Text */}
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
                {q.questionText}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.letter;
                  let optionClass = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200';

                  if (isSubmitted) {
                    if (opt.letter === q.correctLetter) {
                      optionClass = 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-medium';
                    } else if (isSelected && opt.letter !== q.correctLetter) {
                      optionClass = 'border-rose-500 bg-rose-100/60 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 line-through';
                    } else {
                      optionClass = 'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-medium shadow-xs';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, opt.letter)}
                      className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${optionClass}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {opt.letter}
                      </span>
                      <span className="leading-normal">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* In-depth Pedagogical Explanation (When Submitted) */}
              {isSubmitted && (
                <div className="mt-4 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Giải thích sư phạm:</span>
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isAllAnswered ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bạn đã trả lời đủ {quizzes.length}/{quizzes.length} câu. Sẵn sàng nộp bài!
              </span>
            ) : (
              <span>Vui lòng chọn đáp án cho tất cả {quizzes.length} câu trước khi nộp.</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold shadow-sm transition-all"
          >
            Nộp Bài & Xem Điểm
          </button>
        </div>
      )}
    </div>
  );
};
