
import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import CursoCard from './CursoCard';

interface CursosDisponiblesProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onToggleFavorite: (courseId: number) => void;
  favoriteCourseIds: Set<number>;
}

const CursosDisponibles: React.FC<CursosDisponiblesProps> = ({ courses, onSelectCourse, onToggleFavorite, favoriteCourseIds }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchTerm) {
      return courses;
    }
    return courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  return (
    <div className="animate-fade-in">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar cursos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CursoCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favoriteCourseIds.has(course.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
            <h3 className="text-xl font-semibold">No se encontraron cursos</h3>
            <p>Intenta con otro término de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default CursosDisponibles;
