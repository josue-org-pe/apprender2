
import React from 'react';
import { Course } from '../types';
import CursoCard from './CursoCard';

interface MisCursosProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onToggleFavorite: (courseId: number) => void;
  favoriteCourseIds: Set<number>;
}

const MisCursos: React.FC<MisCursosProps> = ({ courses, onSelectCourse, onToggleFavorite, favoriteCourseIds }) => {
  return (
    <div className="animate-fade-in">
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
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
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">Aún no tienes cursos favoritos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Agrega cursos desde la sección "Cursos disponibles" para verlos aquí.
          </p>
        </div>
      )}
    </div>
  );
};

export default MisCursos;
