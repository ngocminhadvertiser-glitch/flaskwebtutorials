import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const isUnlocked = !!badge.unlockedAt;

  return (
    <div
      className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col items-center text-center ${
        isUnlocked
          ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700/60 shadow-sm'
          : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70'
      }`}
    >
      {/* Status top pill */}
      <div className="absolute top-2 right-2">
        {isUnlocked ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Đã đạt
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            <Lock className="w-3 h-3" /> Khóa
          </span>
        )}
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-xs transition-transform ${
          isUnlocked
            ? 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/60 dark:to-amber-900/60 text-amber-600 scale-105'
            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 grayscale'
        }`}
      >
        <span>{badge.icon}</span>
      </div>

      {/* Title */}
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">
        {badge.title}
      </h4>

      {/* Description */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2 line-clamp-2">
        {badge.description}
      </p>

      {/* Module requirement */}
      {badge.requiredModuleNumber && (
        <span className="text-[10px] text-slate-400 font-mono mt-auto">
          Yêu cầu: Module {badge.requiredModuleNumber < 10 ? `0${badge.requiredModuleNumber}` : badge.requiredModuleNumber}
        </span>
      )}
    </div>
  );
};
