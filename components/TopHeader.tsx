import React from 'react';
import { Page } from '../types';

interface TopHeaderProps {
    onMenuClick: () => void;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick, currentPage, setCurrentPage }) => {
  const linkBaseClasses = "flex items-center text-gray-600 hover:text-blue-600 transition-colors";
  const linkActiveClasses = "text-blue-600 font-semibold";

  const handleHomeClick = () => {
    // Navigate to home but also reset course view if on courses page
    if(currentPage === Page.COURSES) {
      // Potentially reset sub-views or state related to courses page here
    }
    setCurrentPage(Page.HOME);
  }

  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between z-10 flex-shrink-0">
      {/* Left side: Logo and mobile menu */}
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 mr-2 rounded-full text-gray-600 hover:bg-gray-100 md:hidden" aria-label="Abrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <button onClick={handleHomeClick} className="text-2xl font-bold text-blue-600">
            Ñam
        </button>
      </div>
      
      {/* Center: Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6">
        <button onClick={() => setCurrentPage(Page.COURSES)} className={`${linkBaseClasses} ${currentPage === Page.COURSES ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A12.052 12.052 0 0112 21.052a12.052 12.052 0 01-6.824-4.001 12.083 12.083 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" /></svg>
          Cursos
        </button>
        <button onClick={() => setCurrentPage(Page.MEETING)} className={`${linkBaseClasses} ${currentPage === Page.MEETING ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Meeting
        </button>
        <button onClick={() => setCurrentPage(Page.GYM)} className={`${linkBaseClasses} ${currentPage === Page.GYM ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Gym
        </button>
        <button onClick={() => setCurrentPage(Page.MATERIALS)} className={`${linkBaseClasses} ${currentPage === Page.MATERIALS ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          Materiales
        </button>
      </nav>
      
      {/* Right side: User Profile */}
      <button onClick={() => setCurrentPage(Page.PROFILE)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <img src="https://picsum.photos/40/40" alt="User Avatar" className="w-8 h-8 rounded-full"/>
        <span className="hidden sm:inline text-sm text-gray-700 font-medium">usuario@email.com</span>
      </button>
    </header>
  );
};

export default TopHeader;