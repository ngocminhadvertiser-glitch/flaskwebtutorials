import React from 'react';
import { BookOpen, ShieldCheck, Heart, ExternalLink, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-slate-900 dark:text-white text-base">
                FLASK WEB LEARNING
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Chính quy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-md">
              Hệ thống Học liệu số Trực tuyến môn Lập trình Web với Python Flask, thiết kế chuyên biệt
              cho sinh viên hệ Cao đẳng, Trung cấp và các cơ sở giáo dục nghề nghiệp theo chuẩn đầu ra ngành CNTT.
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Được xây dựng với</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>dành cho giảng viên và người học Việt Nam</span>
            </div>
          </div>

          {/* Col 2: Tài liệu chính thức */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Tài liệu tham khảo
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://flask.palletsprojects.com/en/stable/quickstart/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  <span>Flask Official Quickstart</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://jinja.palletsprojects.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  <span>Jinja2 Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://flask-sqlalchemy.palletsprojects.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  <span>Flask-SQLAlchemy ORM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://getbootstrap.com/docs/5.3/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  <span>Bootstrap 5 Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quy chuẩn sư phạm */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quy chuẩn đào tạo
            </h4>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <li>✓ Học theo chu trình 7 bước sư phạm</li>
              <li>✓ Phân tích từng dòng lệnh (Line-by-line)</li>
              <li>✓ Mô phỏng máy chủ tương tác</li>
              <li>✓ Đánh giá 5 câu trắc nghiệm chuẩn</li>
              <li>✓ Dự án thực tế chuẩn nghề nghiệp</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            &copy; 2026 FLASK WEB LEARNING – Bản quyền học liệu số thuộc về Hệ thống Đào tạo Nghề nghiệp.
          </div>
          <div className="flex items-center gap-4">
            <span>Phiên bản: Flask 3.x / Python 3.10+</span>
            <span>Môi trường: Client Simulation Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
