import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code2,
  Play,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  FileText,
  HelpCircle,
  Lightbulb,
  Check,
  Menu,
  X,
  Target
} from 'lucide-react';
import { Lesson, Module } from '../types';
import { ALL_MODULES, getModuleByLessonId, getNextLesson, getPrevLesson } from '../data';
import { storageService } from '../services/storageService';
import { CodeBlock } from '../components/CodeBlock';
import { SimulationRunner } from '../components/SimulationRunner';
import { QuizSection } from '../components/QuizSection';

interface LessonViewProps {
  lesson: Lesson;
  onNavigateLesson: (lessonId: string) => void;
  onOpenNotes: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onNavigateLesson,
  onOpenNotes
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'simulation' | 'practice' | 'quiz'>('theory');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(storageService.getLessonProgress(lesson.id));
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<string | null>(null);
  const [showPracticeSolution, setShowPracticeSolution] = useState(false);

  const currentModule = getModuleByLessonId(lesson.id);
  const prevLesson = getPrevLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);

  useEffect(() => {
    setIsBookmarked(storageService.isBookmarked(lesson.id));
    setProgress(storageService.getLessonProgress(lesson.id));
    setQuickCheckAnswer(null);
    setShowPracticeSolution(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const handleToggleBookmark = () => {
    const status = storageService.toggleBookmark(
      lesson.id,
      lesson.title,
      currentModule?.title || 'Flask Web'
    );
    setIsBookmarked(status);
  };

  const handleMarkSectionComplete = (section: 'theory' | 'example' | 'practice' | 'quiz') => {
    const updated = storageService.updateLessonSectionProgress(lesson.id, section, true);
    setProgress(updated);
  };

  const tabs = [
    { id: 'theory', label: '1. Lý thuyết cốt lõi', icon: BookOpen, completed: progress.theoryCompleted },
    { id: 'code', label: '2. Phân tích Code mẫu', icon: Code2, completed: progress.exampleReviewed },
    { id: 'simulation', label: '3. Mô phỏng Thực thi', icon: Play, completed: false },
    { id: 'practice', label: '4. Thực hành & Mở rộng', icon: Target, completed: progress.practiceCompleted },
    { id: 'quiz', label: '5. Đánh giá 5 Trắc nghiệm', icon: Award, completed: progress.quizPassed }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-20">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          <Menu className="w-4 h-4" />
          <span>Danh sách 11 Module & Bài học</span>
        </button>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          Bài {lesson.lessonNumber}
        </span>
      </div>

      {/* Left Navigation Sidebar */}
      <aside
        className={`fixed lg:sticky top-20 z-30 lg:z-10 w-80 shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 max-h-[calc(100vh-6rem)] overflow-y-auto shadow-sm transition-all ${
          sidebarOpen ? 'inset-y-0 left-0 fixed z-50 w-full sm:w-80' : 'hidden lg:block'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Nội dung Khóa học</span>
          </h4>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {ALL_MODULES.map((mod: Module) => (
            <div key={mod.id} className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded">
                M{mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : mod.moduleNumber}. {mod.title.replace(/MODULE \d+ – /, '')}
              </div>

              <div className="space-y-0.5 pl-1">
                {mod.lessons.map((l) => {
                  const isActive = l.id === lesson.id;
                  const isDone = storageService.getLessonProgress(l.id).isCompleted;

                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        onNavigateLesson(l.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-emerald-500 text-white font-bold shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate pr-2">
                        Bài {l.lessonNumber}. {l.title.replace(/^Bài \d+\.\s*/, '')}
                      </span>
                      {isDone && (
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Lesson Content Area */}
      <main className="flex-1 min-w-0 space-y-6">
        {/* Top Breadcrumb & Action Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="text-[11px] text-slate-400 font-medium mb-1">
              {currentModule?.title} &gt; <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Bài {lesson.lessonNumber}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title={isBookmarked ? 'Bỏ lưu bài học' : 'Lưu bài học vào danh sách yêu thích'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Đã lưu' : 'Lưu bài'}</span>
            </button>

            {/* Note button */}
            <button
              onClick={onOpenNotes}
              className="p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              title="Mở sổ tay ghi chú cho bài học này"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Ghi chú</span>
            </button>

            {/* Complete status pill */}
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border ${
                progress.isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{progress.isCompleted ? 'Đã hoàn thành' : 'Đang học'}</span>
            </div>
          </div>
        </div>

        {/* 5 Pedagogical Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.completed && (
                  <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LÝ THUYẾT CỐT LÕI */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            {/* Objectives */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mb-2.5">
                <Target className="w-4 h-4" />
                <span>Mục tiêu Chuẩn Đầu ra bài học:</span>
              </h3>
              <ul className="space-y-1.5">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Concepts */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Khái niệm &amp; Nguyên lý Trọng tâm
              </h3>
              {lesson.concepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs"
                >
                  <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {concept.title}
                  </h4>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-emerald-500 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {concept.definition}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                    {concept.explanation}
                  </p>
                  {concept.notes && (
                    <div className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                      <strong>Lưu ý nghề nghiệp:</strong> {concept.notes.join(' ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Check */}
            {lesson.quickCheck && (
              <div className="p-5 rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/30 space-y-3">
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Kiểm tra Nhanh Nhớ Bài (Quick Check)</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {lesson.quickCheck.question}
                </p>

                <div className="space-y-2">
                  {lesson.quickCheck.options.map((opt) => (
                    <button
                      key={opt.letter}
                      onClick={() => setQuickCheckAnswer(opt.letter)}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm border transition-all flex items-center gap-3 ${
                        quickCheckAnswer === opt.letter
                          ? opt.letter === lesson.quickCheck?.correctLetter
                            ? 'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 font-bold'
                            : 'border-rose-500 bg-rose-100/70 dark:bg-rose-950/70 text-rose-900 dark:text-rose-100'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-400'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                        {opt.letter}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                {quickCheckAnswer && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed animate-fadeIn">
                    <strong className={quickCheckAnswer === lesson.quickCheck.correctLetter ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}>
                      {quickCheckAnswer === lesson.quickCheck.correctLetter ? 'Chính xác! ' : 'Chưa đúng rồi! '}
                    </strong>
                    {lesson.quickCheck.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Bottom complete action for Theory */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  handleMarkSectionComplete('theory');
                  setActiveTab('code');
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <span>Đã hiểu lý thuyết → Chuyển sang Code Mẫu</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PHÂN TÍCH CODE MẪU */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Mã nguồn chuẩn (Standard Reference Code)
              </h3>
              <CodeBlock
                code={lesson.codeExample.code}
                language={lesson.codeExample.language}
                filename={lesson.codeExample.filename}
              />
            </div>

            {/* Line-by-line Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Phân tích Từng Dòng Lệnh (Line-by-Line Breakdown)
              </h3>

              <div className="space-y-2.5">
                {lesson.codeAnalysis.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {item.lineRange}
                      </span>
                      <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {item.codeSnippet}
                      </code>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  handleMarkSectionComplete('example');
                  setActiveTab('simulation');
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <span>Đã nắm rõ code → Thử Chạy Mô Phỏng</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MÔ PHỎNG THỰC THI */}
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            <SimulationRunner
              initialScenario={lesson.simulation}
              onSuccess={() => handleMarkSectionComplete('example')}
            />

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveTab('practice')}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <span>Chuyển sang Bài tập Thực hành</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: THỰC HÀNH & MỞ RỘNG */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Nhiệm vụ Thực hành Nghề nghiệp</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {lesson.practice.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lesson.practice.taskDescription}
              </p>

              {/* Requirements */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Yêu cầu kỹ thuật bắt buộc:
                </h5>
                <ul className="space-y-1">
                  {lesson.practice.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Gợi ý code:</span>
                </div>
                <div className="space-y-1">
                  {lesson.practice.hints.map((h, i) => (
                    <p key={i} className="font-mono text-[11px] text-amber-800 dark:text-amber-200">
                      • {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* Toggle Solution */}
              <div className="pt-2">
                <button
                  onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {showPracticeSolution ? 'Ẩn lời giải mẫu ▲' : 'Xem mã nguồn mẫu tham khảo ▼'}
                </button>

                {showPracticeSolution && (
                  <div className="mt-3">
                    <CodeBlock
                      code={lesson.practice.sampleCode}
                      language="python"
                      filename="solution.py"
                    />
                  </div>
                )}
              </div>

              {/* Expected Result */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-200">Kết quả kiểm tra: </span>
                <span className="text-emerald-700 dark:text-emerald-300">{lesson.practice.expectedResult}</span>
              </div>

              {/* Expansion tasks */}
              {lesson.practice.expansionTasks && (
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Nhiệm vụ nâng cao (Dành cho sinh viên khá giỏi):</span>
                  {lesson.practice.expansionTasks.map((task, i) => (
                    <p key={i}>• {task}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  handleMarkSectionComplete('practice');
                  setActiveTab('quiz');
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <span>Hoàn tất bài tập → Sang Trắc nghiệm Đánh giá</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: TRẮC NGHIỆM ĐÁNH GIÁ */}
        {activeTab === 'quiz' && (
          <div>
            <QuizSection
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              quizzes={lesson.quizzes}
              onQuizCompleted={(score) => {
                if (score >= 60) {
                  handleMarkSectionComplete('quiz');
                }
              }}
            />
          </div>
        )}

        {/* Bottom Lesson Pager (Previous / Next) */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-400 font-normal">Bài trước</div>
                <div className="truncate max-w-[200px]">{prevLesson.title}</div>
              </div>
              <span className="sm:hidden">Bài trước</span>
            </button>
          ) : (
            <div></div>
          )}

          {nextLesson ? (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-emerald-200 font-normal">Bài tiếp theo</div>
                <div className="truncate max-w-[200px]">{nextLesson.title}</div>
              </div>
              <span className="sm:hidden">Bài tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNavigateLesson(ALL_MODULES[0].lessons[0].id)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
            >
              Về Bài Học Đầu Tiên
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
