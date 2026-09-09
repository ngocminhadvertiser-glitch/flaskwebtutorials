import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  Download,
  FolderTree,
  Terminal,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { FINAL_PROJECT, ProjectStep } from '../data/finalProject';
import { CodeBlock } from '../components/CodeBlock';

export const FinalProjectView: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep: ProjectStep = FINAL_PROJECT.steps[activeStepIndex];

  return (
    <div className="space-y-8 pb-20">
      {/* Project Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Đề án Kết thúc Học phần</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {FINAL_PROJECT.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {FINAL_PROJECT.description}
        </p>

        {/* Feature checklist tags */}
        <div className="pt-2 flex flex-wrap gap-2">
          {FINAL_PROJECT.features.map((feat, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-emerald-300 border border-slate-700"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{feat}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FINAL_PROJECT.steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                Giai đoạn {step.stepNumber}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                {step.title.replace(/^Bước \d+\.\s*/, '')}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-sm">
        {/* Step Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Hướng dẫn Thực hành Nghề nghiệp – Bước {currentStep.stepNumber}/4
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {currentStep.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
            <strong>Mục tiêu: </strong> {currentStep.goal}
          </p>
        </div>

        {/* Concepts Used */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Kiến thức áp dụng:
          </span>
          {currentStep.conceptsUsed.map((concept, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {concept}
            </span>
          ))}
        </div>

        {/* Folder Structure if step 1 */}
        {currentStep.folderStructure && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-emerald-500" />
              <span>Cấu trúc Thư mục Chuẩn của Dự án:</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800">
              <pre>{currentStep.folderStructure}</pre>
            </div>
          </div>
        )}

        {/* Code Snippet */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>Mã nguồn chính ({currentStep.codeSnippet.filename}):</span>
          </h4>
          <CodeBlock
            code={currentStep.codeSnippet.code}
            language={currentStep.codeSnippet.language}
            filename={currentStep.codeSnippet.filename}
          />
        </div>

        {/* Step Explanations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Giải thích Quy trình Kỹ thuật:
          </h4>
          <ul className="space-y-1.5">
            {currentStep.explanation.map((exp, i) => (
              <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Execution Command & Expected Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Terminal className="w-4 h-4 text-sky-500" />
              <span>Lệnh thực thi trong Terminal:</span>
            </div>
            <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block">
              {currentStep.runInstructions}
            </code>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Kết quả kiểm tra đạt chuẩn:</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              {currentStep.expectedResult}
            </p>
          </div>
        </div>

        {/* Expansion Tasks */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Đề bài Mở rộng Khuyến khích:
          </span>
          {currentStep.expansionTasks.map((task, i) => (
            <p key={i} className="text-xs text-slate-500 dark:text-slate-400">
              ★ {task}
            </p>
          ))}
        </div>

        {/* Step Navigation Buttons */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex(activeStepIndex - 1)}
            className="px-4 py-2 rounded-lg border text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40"
          >
            ← Bước trước
          </button>

          {activeStepIndex < FINAL_PROJECT.steps.length - 1 ? (
            <button
              onClick={() => setActiveStepIndex(activeStepIndex + 1)}
              className="flex items-center gap-1 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              <span>Tiếp tục sang Bước {activeStepIndex + 2}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Bạn đã xem hết các bước đề án!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
