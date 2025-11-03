import React from 'react';
import { Material } from '../types';

// Icons for different material types
const TypeIcon = ({ type }: { type: Material['type'] }) => {
  if (type === 'PDF') {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
  }
  if (type === 'Libro') {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
  }
  if (type === 'Video') {
      return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
      );
  }
  return null;
};


interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center text-gray-500 mb-3">
            <TypeIcon type={material.type} />
            <span className="ml-2 text-sm font-semibold">{material.type}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex-1">{material.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{material.description}</p>
        <a
          href={material.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-start px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          {material.type === 'Video' ? 'Ver Video' : 'Abrir Material'}
        </a>
      </div>
    </div>
  );
};

export default MaterialCard;
