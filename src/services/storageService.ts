import { User, UserLessonProgress, QuizAttempt, Note, Bookmark, Badge, UserRole } from '../types';
import { ALL_LESSONS, ALL_MODULES, INITIAL_BADGES } from '../data';

const STORAGE_KEYS = {
  USER: 'flask_learning_user',
  PROGRESS: 'flask_learning_progress',
  QUIZ_ATTEMPTS: 'flask_learning_quiz_attempts',
  NOTES: 'flask_learning_notes',
  BOOKMARKS: 'flask_learning_bookmarks',
  THEME: 'flask_learning_theme',
  ALL_STUDENTS: 'flask_learning_students_mock'
};

export const DEMO_STUDENT: User = {
  id: 'student-demo',
  username: 'sinhvien_it',
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan.cd24@caodang.edu.vn',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedAt: '2026-09-01'
};

export const DEMO_TEACHER: User = {
  id: 'teacher-demo',
  username: 'thay_tuan_flask',
  fullName: 'ThS. Trần Tuấn Anh',
  email: 'tuananh.gv@caodang.edu.vn',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  joinedAt: '2025-08-15'
};

const MOCK_OTHER_STUDENTS: { user: User; progressRate: number; avgQuiz: number; completedCount: number }[] = [
  {
    user: { id: 'sv-2', username: 'lethimai', fullName: 'Lê Thị Mai', email: 'mailt@caodang.edu.vn', role: 'student', joinedAt: '2026-09-02' },
    progressRate: 85,
    avgQuiz: 92,
    completedCount: 10
  },
  {
    user: { id: 'sv-3', username: 'tran_hung', fullName: 'Trần Văn Hùng', email: 'hungtv@caodang.edu.vn', role: 'student', joinedAt: '2026-09-03' },
    progressRate: 60,
    avgQuiz: 78,
    completedCount: 7
  },
  {
    user: { id: 'sv-4', username: 'pham_minh', fullName: 'Phạm Nhật Minh', email: 'minhpn@caodang.edu.vn', role: 'student', joinedAt: '2026-09-05' },
    progressRate: 40,
    avgQuiz: 80,
    completedCount: 5
  },
  {
    user: { id: 'sv-5', username: 'hoang_yen', fullName: 'Hoàng Hải Yến', email: 'yenhh@caodang.edu.vn', role: 'student', joinedAt: '2026-09-06' },
    progressRate: 95,
    avgQuiz: 96,
    completedCount: 11
  }
];

export const storageService = {
  // --- AUTH & USER ---
  getCurrentUser(): User {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      this.setCurrentUser(DEMO_STUDENT);
      return DEMO_STUDENT;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEMO_STUDENT;
    }
  },

  setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  switchUserRole(role: UserRole): User {
    const user = role === 'teacher' || role === 'admin' ? DEMO_TEACHER : DEMO_STUDENT;
    this.setCurrentUser(user);
    return user;
  },

  // --- PROGRESS TRACKING ---
  getAllProgress(): Record<string, UserLessonProgress> {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) {
      // Khởi tạo mặc định bài 1 đã hoàn thành để sinh viên có trải nghiệm ban đầu
      const initial: Record<string, UserLessonProgress> = {
        'lesson-1': {
          lessonId: 'lesson-1',
          theoryCompleted: true,
          exampleReviewed: true,
          practiceCompleted: true,
          quizPassed: true,
          isCompleted: true,
          lastStudiedAt: new Date().toISOString(),
          quizHighScore: 100
        }
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  getLessonProgress(lessonId: string): UserLessonProgress {
    const all = this.getAllProgress();
    return all[lessonId] || {
      lessonId,
      theoryCompleted: false,
      exampleReviewed: false,
      practiceCompleted: false,
      quizPassed: false,
      isCompleted: false,
      lastStudiedAt: new Date().toISOString()
    };
  },

  updateLessonSectionProgress(
    lessonId: string,
    section: 'theory' | 'example' | 'practice' | 'quiz',
    value: boolean = true
  ): UserLessonProgress {
    const all = this.getAllProgress();
    const current = all[lessonId] || {
      lessonId,
      theoryCompleted: false,
      exampleReviewed: false,
      practiceCompleted: false,
      quizPassed: false,
      isCompleted: false,
      lastStudiedAt: new Date().toISOString()
    };

    if (section === 'theory') current.theoryCompleted = value;
    if (section === 'example') current.exampleReviewed = value;
    if (section === 'practice') current.practiceCompleted = value;
    if (section === 'quiz') current.quizPassed = value;

    // Bài học được đánh dấu hoàn thành nếu xong ít nhất lý thuyết + quiz hoặc cả 4 phần
    current.isCompleted = current.theoryCompleted && current.quizPassed;
    current.lastStudiedAt = new Date().toISOString();

    all[lessonId] = current;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    return current;
  },

  // --- QUIZ ATTEMPTS ---
  getQuizAttempts(): QuizAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveQuizAttempt(attempt: QuizAttempt): void {
    const list = this.getQuizAttempts();
    list.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(list));

    // Update highest score in lesson progress
    const allProg = this.getAllProgress();
    const curProg = allProg[attempt.lessonId] || {
      lessonId: attempt.lessonId,
      theoryCompleted: false,
      exampleReviewed: false,
      practiceCompleted: false,
      quizPassed: false,
      isCompleted: false,
      lastStudiedAt: new Date().toISOString()
    };

    curProg.quizHighScore = Math.max(curProg.quizHighScore || 0, attempt.score);
    if (attempt.score >= 60) {
      curProg.quizPassed = true;
      if (curProg.theoryCompleted) curProg.isCompleted = true;
    }
    allProg[attempt.lessonId] = curProg;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProg));
  },

  // --- NOTES ---
  getNotes(): Note[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) {
      const defaultNotes: Note[] = [
        {
          id: 'note-1',
          lessonId: 'lesson-2',
          lessonTitle: 'Bài 2. Tạo Flask Application đầu tiên',
          content: 'Lưu ý cốt lõi: app = Flask(__name__) giúp Flask tự tìm thư mục templates/ và static/. Khi test phải dùng debug=True.',
          updatedAt: '2026-09-08'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(defaultNotes));
      return defaultNotes;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveNote(lessonId: string, lessonTitle: string, content: string): Note {
    const notes = this.getNotes();
    const existingIndex = notes.findIndex(n => n.lessonId === lessonId);
    let note: Note;
    if (existingIndex >= 0) {
      notes[existingIndex].content = content;
      notes[existingIndex].updatedAt = new Date().toISOString().split('T')[0];
      note = notes[existingIndex];
    } else {
      note = {
        id: 'note-' + Date.now(),
        lessonId,
        lessonTitle,
        content,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      notes.unshift(note);
    }
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return note;
  },

  deleteNote(id: string): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },

  // --- BOOKMARKS ---
  getBookmarks(): Bookmark[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) {
      const defaultBm: Bookmark[] = [
        {
          id: 'bm-1',
          lessonId: 'lesson-2',
          lessonTitle: 'Bài 2. Tạo Flask Application đầu tiên',
          moduleTitle: 'MODULE 01 – Làm quen với Flask',
          createdAt: '2026-09-08'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(defaultBm));
      return defaultBm;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  toggleBookmark(lessonId: string, lessonTitle: string, moduleTitle: string): boolean {
    const list = this.getBookmarks();
    const exists = list.some(b => b.lessonId === lessonId);
    if (exists) {
      const updated = list.filter(b => b.lessonId !== lessonId);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      return false; // Removed
    } else {
      list.unshift({
        id: 'bm-' + Date.now(),
        lessonId,
        lessonTitle,
        moduleTitle,
        createdAt: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
      return true; // Added
    }
  },

  isBookmarked(lessonId: string): boolean {
    return this.getBookmarks().some(b => b.lessonId === lessonId);
  },

  // --- BADGES & STATS ---
  calculateStats() {
    const allProgress = this.getAllProgress();
    const totalLessons = ALL_LESSONS.length;
    const completedLessons = (Object.values(allProgress) as UserLessonProgress[]).filter(p => p.isCompleted).length;
    const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const attempts = this.getQuizAttempts();
    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length)
      : 85;

    // Badges calculation
    const badges: Badge[] = INITIAL_BADGES.map(b => {
      let isUnlocked = false;
      if (b.requiredModuleNumber) {
        const mod = ALL_MODULES.find(m => m.moduleNumber === b.requiredModuleNumber);
        if (mod) {
          const allCompleted = mod.lessons.every(l => allProgress[l.id]?.isCompleted);
          if (allCompleted) isUnlocked = true;
        }
      } else if (b.code === 'flask_master') {
        isUnlocked = completionPercent === 100;
      }
      return {
        ...b,
        unlockedAt: isUnlocked ? 'Đã đạt được' : undefined
      };
    });

    return {
      totalLessons,
      completedLessons,
      uncompletedLessons: totalLessons - completedLessons,
      completionPercent,
      avgQuizScore: avgScore,
      totalQuizzesDone: attempts.length,
      badges,
      unlockedBadgesCount: badges.filter(b => b.unlockedAt).length
    };
  },

  // --- ADMIN STATS & EXPORT ---
  getAdminOverview() {
    const stats = this.calculateStats();
    const studentsList = [
      {
        user: this.getCurrentUser(),
        progressRate: stats.completionPercent,
        avgQuiz: stats.avgQuizScore,
        completedCount: stats.completedLessons
      },
      ...MOCK_OTHER_STUDENTS
    ];

    const avgClassScore = Math.round(
      studentsList.reduce((acc, s) => acc + s.avgQuiz, 0) / studentsList.length
    );
    const avgClassProgress = Math.round(
      studentsList.reduce((acc, s) => acc + s.progressRate, 0) / studentsList.length
    );

    return {
      totalStudents: studentsList.length,
      totalModules: ALL_MODULES.length,
      totalLessons: ALL_LESSONS.length,
      totalQuizAttempts: stats.totalQuizzesDone + 48,
      avgClassScore,
      avgClassProgress,
      studentsList
    };
  },

  exportStudentsCSV(): string {
    const overview = this.getAdminOverview();
    const rows = [
      ['Mã SV / Username', 'Họ và tên', 'Email', 'Tiến độ (%)', 'Điểm Quiz TB', 'Số bài hoàn thành'],
      ...overview.studentsList.map(s => [
        s.user.username,
        s.user.fullName,
        s.user.email,
        `${s.progressRate}%`,
        `${s.avgQuiz}/100`,
        `${s.completedCount}/${ALL_LESSONS.length}`
      ])
    ];
    return rows.map(r => r.join(',')).join('\n');
  }
};
