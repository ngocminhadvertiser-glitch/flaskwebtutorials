export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
}

export interface CodeAnalysisItem {
  lineRange: string;
  codeSnippet: string;
  explanation: string;
}

export interface SimulationConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  requestBody?: string;
  queryParams?: Record<string, string>;
  expectedStatus: number;
  responseType: 'html' | 'json' | 'text';
  responsePreview: string;
  serverConsoleLog: string[];
}

export type SimulationScenario = SimulationConfig;

export interface PracticeTask {
  id: string;
  title: string;
  taskDescription: string;
  requirements: string[];
  hints: string[];
  sampleCode: string;
  expectedResult: string;
  expansionTasks: string[];
}

export interface QuickCheck {
  id: string;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctLetter: string;
  explanation: string;
}

export interface QuizOption {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  questionText: string;
  options: QuizOption[];
  correctLetter: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
}

export interface QuizAttempt {
  id: string;
  userId?: string;
  lessonId: string;
  lessonTitle?: string;
  score: number; // 0 - 100
  correctCount: number;
  totalQuestions: number;
  completedAt?: string;
  attemptedAt?: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'> | {
    questionId: string;
    selectedLetter: string;
    isCorrect: boolean;
  }[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  lessonNumber: number;
  title: string;
  slug: string;
  objectives: string[];
  concepts: {
    title: string;
    definition: string;
    explanation: string;
    whenToUse?: string;
    notes?: string[];
  }[];
  codeExample: {
    filename: string;
    language: 'python' | 'html' | 'jinja2' | 'bash';
    code: string;
  };
  codeAnalysis: CodeAnalysisItem[];
  simulation: SimulationConfig;
  quickCheck?: QuickCheck;
  practice: PracticeTask;
  quizzes: QuizQuestion[];
  orderIndex: number;
  isPublished: boolean;
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  totalLessons: number;
}

export interface UserLessonProgress {
  lessonId: string;
  theoryCompleted: boolean;
  exampleReviewed: boolean;
  practiceCompleted: boolean;
  quizPassed: boolean;
  isCompleted: boolean;
  lastStudiedAt: string;
  quizHighScore?: number;
}

export interface Badge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  requiredModuleNumber?: number;
  unlockedAt?: string;
}

export interface Note {
  id: string;
  lessonId: string;
  lessonTitle: string;
  content: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  createdAt: string;
}

export type ActiveTab = 
  | 'home' 
  | 'modules' 
  | 'lesson' 
  | 'quiz' 
  | 'practice' 
  | 'dashboard' 
  | 'admin' 
  | 'project' 
  | 'bookmarks' 
  | 'notes' 
  | 'search';
