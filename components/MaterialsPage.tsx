import React, { useState, useMemo } from 'react';
import { Material, Course } from '../types';
import { MATERIALS_DATA, COURSES_DATA } from '../constants';
import MaterialCard from './MaterialCard';

const MaterialsPage: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(COURSES_DATA.length > 0 ? COURSES_DATA[0].id : null);
  const [searchTerm, setSearchTerm] = useState('');

  const visibleCourses = useMemo(() => {
    return COURSES_DATA.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredMaterials = useMemo(() => {
    if (selectedCourseId === null) {
      return [];
    }
    return MATERIALS_DATA.filter(material => material.courseId === selectedCourseId);
  }, [selectedCourseId]);

  return (
    <div className="flex h-screen bg-white">
      {/* Course Navigation Sidebar */}
      <aside className="group flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col w-full md:w-20 hover:md:w-80 transition-all duration-300 ease-in-out">
        <div className="p-4 border-b h-16 flex items-center md:justify-center group-hover:md:justify-start">
          <h1 className="text-xl font-bold text-gray-800 md:hidden group-hover:md:block whitespace-nowrap">Cursos</h1>
        </div>
        
        {/* Search Bar */}
        <div className="p-4 md:hidden group-hover:md:block">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                    type="text"
                    placeholder="Buscar curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
        
        <nav className="flex-1 p-2 md:p-4 overflow-y-auto no-scrollbar">
          <ul className="space-y-2">
            {visibleCourses.map((course: Course) => (
              <li key={course.id}>
                <button
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${
                    selectedCourseId === course.id
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-700 rounded-full font-bold text-xs flex-shrink-0">
                    {course.name.charAt(0)}
                  </span>
                  <span className="ml-3 text-sm md:hidden group-hover:md:inline whitespace-nowrap">{course.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Biblioteca de Materiales</h1>
            <p className="text-lg text-gray-600 mt-2">
              Selecciona un curso para ver los materiales disponibles.
            </p>
          </div>

          {filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 bg-white rounded-lg">
              <h3 className="text-xl font-semibold">No hay materiales para este curso</h3>
              <p>Selecciona otro curso para ver sus recursos.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MaterialsPage;