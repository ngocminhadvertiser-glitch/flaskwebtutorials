import { Course, Module, Lesson } from '../types';
import { MODULE_1 } from './modules/module1';
import { MODULE_2 } from './modules/module2';
import { MODULE_3 } from './modules/module3';
import { MODULE_4 } from './modules/module4';
import { MODULE_5, MODULE_6 } from './modules/module5';
import { MODULE_7, MODULE_8 } from './modules/module7';
import { MODULE_9, MODULE_10 } from './modules/module9';
import { MODULE_11 } from './modules/module11';
import { INITIAL_BADGES } from './badges';
import { FINAL_PROJECT } from './finalProject';

export const ALL_MODULES: Module[] = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
  MODULE_6,
  MODULE_7,
  MODULE_8,
  MODULE_9,
  MODULE_10,
  MODULE_11
];

export const COURSE_INFO: Course = {
  id: 'flask-web-dev',
  title: 'Lập trình Flask Web từ Cơ bản đến Nâng cao',
  description: 'Học liệu số trực tuyến chính quy dành cho sinh viên Cao đẳng, Trung cấp và Người mới bắt đầu học Lập trình Web với Python Flask.',
  totalModules: ALL_MODULES.length,
  totalLessons: ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
};

export const ALL_LESSONS: Lesson[] = ALL_MODULES.flatMap(m => m.lessons);

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === id);
}

export function getModuleByLessonId(lessonId: string): Module | undefined {
  return ALL_MODULES.find(m => m.lessons.some(l => l.id === lessonId));
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = ALL_LESSONS.findIndex(l => l.id === currentLessonId);
  if (currentIndex !== -1 && currentIndex < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[currentIndex + 1];
  }
  return undefined;
}

export function getPrevLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = ALL_LESSONS.findIndex(l => l.id === currentLessonId);
  if (currentIndex > 0) {
    return ALL_LESSONS[currentIndex - 1];
  }
  return undefined;
}

export { INITIAL_BADGES, FINAL_PROJECT };
