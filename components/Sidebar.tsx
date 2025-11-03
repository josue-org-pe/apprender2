import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const linkBaseClasses = "w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 md:justify-center group-hover:md:justify-start transition-colors";
  const linkActiveClasses = "bg-blue-100 text-blue-700 font-semibold";

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
  }

  return (
    <aside className={`group fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg flex-shrink-0 flex flex-col transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-in-out md:relative md:translate-x-0 md:w-20 hover:md:w-64`}>
      <div className="h-16 flex items-center justify-between md:justify-center px-4 border-b">
         <div className="text-xl font-bold text-blue-600 md:hidden group-hover:md:inline">Ñam</div>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 hover:text-gray-800" aria-label="Cerrar menú">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      
      {/* Spacer to push content down */}
      <div className="flex-1"></div>

      {/* Bottom navigation */}
      <nav className="p-2 md:p-4 space-y-2">
        <button onClick={() => handleNavClick(Page.COURSES)} className={`${linkBaseClasses} ${currentPage === Page.COURSES ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A12.052 12.052 0 0112 21.052a12.052 12.052 0 01-6.824-4.001 12.083 12.083 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" /></svg>
          <span className="md:ml-3 md:hidden group-hover:md:inline whitespace-nowrap">Cursos</span>
        </button>
        <button onClick={() => handleNavClick(Page.PROFILE)} className={`${linkBaseClasses} ${currentPage === Page.PROFILE ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="md:ml-3 md:hidden group-hover:md:inline whitespace-nowrap">Mi Perfil</span>
        </button>
        <button onClick={() => handleNavClick(Page.SETTINGS)} className={`${linkBaseClasses} ${currentPage === Page.SETTINGS ? linkActiveClasses : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="md:ml-3 md:hidden group-hover:md:inline whitespace-nowrap">Configuración</span>
        </button>
      </nav>
      <div className="p-4 border-t">
        <button onClick={() => handleNavClick(Page.PROFILE)} className="w-full flex items-center md:justify-center group-hover:md:justify-start">
            <img src="https://picsum.photos/40/40" alt="User Avatar" className="rounded-full flex-shrink-0"/>
            <div className="md:ml-3 md:hidden group-hover:md:inline whitespace-nowrap">
                <p className="font-semibold text-gray-800 text-sm">Usuario</p>
                <p className="text-xs text-gray-500">Miembro Premium</p>
            </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;