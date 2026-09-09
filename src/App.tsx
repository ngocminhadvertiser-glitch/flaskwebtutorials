import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { LessonView } from './views/LessonView';
import { FinalProjectView } from './views/FinalProjectView';
import { BadgesView } from './views/BadgesView';
import { AdminView } from './views/AdminView';
import { SearchModal } from './components/SearchModal';
import { NotesDrawer } from './components/NotesDrawer';
import { storageService } from './services/storageService';
import { ALL_LESSONS, getLessonById } from './data';
import { User, Lesson } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>(ALL_LESSONS[0].id);
  const [currentUser, setCurrentUser] = useState<User>(storageService.getCurrentUser());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('flask_learning_theme') === 'dark';
  });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [notesOpen, setNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('flask_learning_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('flask_learning_theme', 'light');
    }
  }, [isDarkMode]);

  // Global hotkey for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'lesson' && param) {
      setActiveLessonId(param);
      setCurrentView('lesson');
    } else if (view === 'curriculum') {
      setCurrentView('home');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchRole = () => {
    const nextRole = currentUser.role === 'student' ? 'teacher' : 'student';
    const updatedUser = storageService.switchUserRole(nextRole);
    setCurrentUser(updatedUser);
  };

  const activeLesson: Lesson = getLessonById(activeLessonId) || ALL_LESSONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotes={() => setNotesOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'home' && (
          <HomeView
            onNavigateLesson={handleNavigateLesson}
            onNavigateView={handleNavigate}
          />
        )}

        {currentView === 'lesson' && (
          <LessonView
            lesson={activeLesson}
            onNavigateLesson={handleNavigateLesson}
            onOpenNotes={() => setNotesOpen(true)}
          />
        )}

        {currentView === 'final-project' && <FinalProjectView />}

        {currentView === 'badges' && <BadgesView />}

        {currentView === 'admin' && <AdminView />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectLesson={handleNavigateLesson}
      />

      {/* Personal Notes Drawer */}
      <NotesDrawer
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        currentLessonId={currentView === 'lesson' ? activeLesson.id : undefined}
        currentLessonTitle={currentView === 'lesson' ? activeLesson.title : undefined}
      />
    </div>
  );
}
