import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, BookOpen, Clock } from 'lucide-react';
import { storageService } from '../services/storageService';
import { Note } from '../types';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonId?: string;
  currentLessonTitle?: string;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  currentLessonId,
  currentLessonTitle
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeContent, setActiveContent] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const allNotes = storageService.getNotes();
      setNotes(allNotes);

      if (currentLessonId) {
        const found = allNotes.find(n => n.lessonId === currentLessonId);
        setActiveContent(found ? found.content : '');
      }
    }
  }, [isOpen, currentLessonId]);

  const handleSave = () => {
    if (!currentLessonId || !currentLessonTitle) return;
    if (!activeContent.trim()) {
      setSaveStatus('Nội dung ghi chú trống!');
      return;
    }

    const saved = storageService.saveNote(currentLessonId, currentLessonTitle, activeContent);
    setNotes(storageService.getNotes());
    setSaveStatus('Đã lưu thành công!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleDelete = (id: string) => {
    storageService.deleteNote(id);
    const updated = storageService.getNotes();
    setNotes(updated);
    if (currentLessonId) {
      const found = updated.find(n => n.lessonId === currentLessonId);
      setActiveContent(found ? found.content : '');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Sổ tay Ghi chú Cá nhân
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Lesson Note Editor */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Ghi chú cho bài học hiện tại:</span>
            {saveStatus && (
              <span className="text-emerald-600 dark:text-emerald-400 font-normal">
                {saveStatus}
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mb-2 truncate">
            {currentLessonTitle || 'Chọn một bài học'}
          </p>

          <textarea
            rows={4}
            value={activeContent}
            onChange={(e) => setActiveContent(e.target.value)}
            disabled={!currentLessonId}
            placeholder={currentLessonId ? 'Viết ý chính, cú pháp quan trọng hoặc lỗi cần lưu ý...' : 'Hãy mở một bài học để ghi chú'}
            className="w-full p-2.5 text-xs font-sans rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />

          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSave}
              disabled={!currentLessonId}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu ghi chú</span>
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Tất cả ghi chú ({notes.length})
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Chưa có ghi chú nào. Hãy bắt đầu ghi chép kiến thức khi học nhé!
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {note.lessonTitle}
                  </h5>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                    title="Xóa ghi chú"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <Clock className="w-3 h-3" />
                  <span>Cập nhật: {note.updatedAt}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
