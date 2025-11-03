import React from 'react';
import { CourseView } from '../types';

interface HeaderProps {
  currentView: CourseView;
  setCurrentView: (view: CourseView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const baseClasses = 'px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const activeClasses = 'bg-blue-600 text-white shadow-md';
  const inactiveClasses = 'bg-white text-gray-700 hover:bg-gray-200';

  return (
    <header className="bg-white p-2 rounded-xl shadow-sm flex items-center justify-center md:justify-start">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentView(CourseView.AVAILABLE)}
          className={`${baseClasses} ${currentView === CourseView.AVAILABLE ? activeClasses : inactiveClasses}`}
        >
          <span className="hidden sm:inline">🟢 Cursos disponibles</span>
          <span className="sm:hidden">🟢</span>
        </button>
        <button
          onClick={() => setCurrentView(CourseView.MY_COURSES)}
          className={`${baseClasses} ${currentView === CourseView.MY_COURSES ? activeClasses : inactiveClasses}`}
        >
          <span className="hidden sm:inline">🔵 Mis cursos</span>
          <span className="sm:hidden">🔵</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
