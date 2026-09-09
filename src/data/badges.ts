import { Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    code: 'flask_beginner',
    title: 'Flask Beginner',
    description: 'Hoàn thành toàn bộ bài học và Quiz của Module 01: Làm quen với Flask.',
    icon: '🌱',
    requiredModuleNumber: 1
  },
  {
    id: 'badge-2',
    code: 'routing_master',
    title: 'Routing Master',
    description: 'Làm chủ Dynamic Routes, URL Converters và url_for() trong Module 02.',
    icon: '🧭',
    requiredModuleNumber: 2
  },
  {
    id: 'badge-3',
    code: 'http_explorer',
    title: 'HTTP Explorer',
    description: 'Xử lý thành thạo các phương thức GET, POST, Query Params và Form Data ở Module 03.',
    icon: '⚡',
    requiredModuleNumber: 3
  },
  {
    id: 'badge-4',
    code: 'jinja_explorer',
    title: 'Jinja Explorer',
    description: 'Sử dụng thuần thục Jinja2, Variables, Filters, Loops và Template Inheritance ở Module 04.',
    icon: '🎨',
    requiredModuleNumber: 4
  },
  {
    id: 'badge-5',
    code: 'database_developer',
    title: 'Database Developer',
    description: 'Kết nối SQLite, xây dựng Model SQLAlchemy và thực hiện trọn vẹn CRUD ở Module 08.',
    icon: '🗄️',
    requiredModuleNumber: 8
  },
  {
    id: 'badge-6',
    code: 'api_architect',
    title: 'API Architect',
    description: 'Xây dựng chuẩn RESTful API và xử lý JSON Response ở Module 10.',
    icon: '🔌',
    requiredModuleNumber: 10
  },
  {
    id: 'badge-7',
    code: 'flask_master',
    title: 'Flask Master Developer',
    description: 'Hoàn thành 100% các Module và Dự án Quản lý Sinh viên cuối khóa!',
    icon: '🏆'
  }
];
