import React from 'react';
import {
  Play,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  Layout,
  Palette,
  CheckSquare,
  ShieldCheck,
  Database,
  FolderTree,
  Cpu,
  Bug,
  GraduationCap
} from 'lucide-react';
import { ALL_MODULES, ALL_LESSONS } from '../data';
import { storageService } from '../services/storageService';
import { Module } from '../types';

interface HomeViewProps {
  onNavigateLesson: (lessonId: string) => void;
  onNavigateView: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateLesson, onNavigateView }) => {
  const stats = storageService.calculateStats();
  const allProgress = storageService.getAllProgress();

  // Find next incomplete lesson
  const nextLesson = ALL_LESSONS.find(l => !allProgress[l.id]?.isCompleted) || ALL_LESSONS[0];

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Route': return <Zap className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'FolderTree': return <FolderTree className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Bug': return <Bug className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <GraduationCap className="w-4 h-4" />
            <span>Chương trình Giáo dục Nghề nghiệp Chuẩn Quốc Gia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            FLASK WEB LEARNING
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Học liệu số trực tuyến môn Lập trình Web với Python & Flask. Tiếp cận theo lộ trình chuẩn:
            <span className="font-semibold text-emerald-400"> Học Lý Thuyết → Xem Code Mẫu → Chạy Mô Phỏng → Thực Hành → Làm Quiz</span>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Tiếp tục học: {nextLesson.title}</span>
            </button>

            <button
              onClick={() => onNavigateView('final-project')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              <span>Xem Đề án Cuối khóa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>
      </div>

      {/* 4 Overview Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tiến độ khóa học</span>
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">
            {stats.completionPercent}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bài học hoàn thành</span>
            <span className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">
            {stats.completedLessons} / {stats.totalLessons}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Còn {stats.uncompletedLessons} bài cần hoàn thành
          </p>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Điểm Quiz trung bình</span>
            <span className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">
            {stats.avgQuizScore} / 100
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {stats.totalQuizzesDone} bài kiểm tra đã làm
          </p>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Huy hiệu đạt được</span>
            <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">
            {stats.unlockedBadgesCount} / {stats.badges.length}
          </div>
          <button
            onClick={() => onNavigateView('badges')}
            className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            Xem bảng vàng thành tích →
          </button>
        </div>
      </div>

      {/* Pedagogical Roadmap: 11 Modules */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Lộ trình 11 Module Đào tạo Chuẩn Nghề
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Mỗi module được cấu trúc thành các bài học tích hợp lý thuyết, code mẫu, mô phỏng và bài kiểm tra.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_MODULES.map((module: Module) => {
            const completedInModule = module.lessons.filter(l => allProgress[l.id]?.isCompleted).length;
            const percent = Math.round((completedInModule / module.lessons.length) * 100);
            const isAllDone = percent === 100;

            return (
              <div
                key={module.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:shadow-md hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  {/* Header badge & icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      MODULE {module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber}
                    </span>
                    <span className={`p-2 rounded-xl transition-colors ${
                      isAllDone
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-emerald-500'
                    }`}>
                      {getModuleIcon(module.icon)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Lesson List preview */}
                  <div className="space-y-1.5 mb-4">
                    {module.lessons.map((lesson) => {
                      const isDone = allProgress[lesson.id]?.isCompleted;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onNavigateLesson(lesson.id)}
                          className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs flex items-center justify-between group/item transition-colors"
                        >
                          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[220px]">
                            {lesson.title}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : (
                            <span className="text-[10px] text-slate-400 group-hover/item:text-emerald-500">
                              Bắt đầu →
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar and CTA button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Tiến độ: {completedInModule}/{module.lessons.length} bài</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <button
                    onClick={() => onNavigateLesson(module.lessons[0].id)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Vào học Module này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Project Teaser Box */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Dự Án Tốt Nghiệp Thực Chiến
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            FLASK STUDENT MANAGEMENT SYSTEM
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Áp dụng toàn diện 11 Module: Xây dựng hệ thống quản lý sinh viên thực tế với cơ sở dữ liệu SQLite, ORM SQLAlchemy, xác thực người dùng Session, giao diện Bootstrap 5 và cung cấp chuẩn RESTful API.
          </p>
        </div>

        <button
          onClick={() => onNavigateView('final-project')}
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          Khám phá Đề án Cuối khóa
        </button>
      </div>
    </div>
  );
};
