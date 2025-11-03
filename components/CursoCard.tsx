
import React from 'react';
import { Course } from '../types';

interface CursoCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onToggleFavorite: (courseId: number) => void;
  isFavorite: boolean;
}

const CursoCard: React.FC<CursoCardProps> = ({ course, onSelectCourse, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </div>
      <div className="p-4 bg-gray-50 flex items-center justify-between">
        <button
          onClick={() => onSelectCourse(course)}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ver curso
        </button>
        <button
          onClick={() => onToggleFavorite(course.id)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            isFavorite
              ? 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <span className={isFavorite ? 'text-yellow-400' : ''}>⭐</span> {isFavorite ? 'Favorito' : 'Favorito'}
        </button>
      </div>
    </div>
  );
};

export default CursoCard;
