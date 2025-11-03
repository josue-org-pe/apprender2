import React from 'react';
import { Course } from '../types';

interface HomePageProps {
  courses: Course[];
  progress: Record<number, Set<number>>;
  onSelectCourse: (course: Course) => void;
}

const HomePage: React.FC<HomePageProps> = ({ courses, progress, onSelectCourse }) => {
  const coursesInProgress = courses.filter(course => progress[course.id] && progress[course.id].size > 0);

  const calculateProgress = (course: Course) => {
    const completedTopics = progress[course.id]?.size || 0;
    const totalTopics = course.topics.length;
    if (totalTopics === 0) return 0;
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const rankingData = [
    { name: 'Elena García', score: 2450, avatar: 'https://picsum.photos/seed/1/40/40' },
    { name: 'Carlos Rodriguez', score: 2300, avatar: 'https://picsum.photos/seed/2/40/40' },
    { name: 'Ana Martinez', score: 2150, avatar: 'https://picsum.photos/seed/3/40/40' },
    { name: 'Usuario (Tú)', score: 1980, avatar: 'https://picsum.photos/seed/user/40/40' },
    { name: 'Javier López', score: 1850, avatar: 'https://picsum.photos/seed/4/40/40' },
    { name: 'Laura Sanchez', score: 1700, avatar: 'https://picsum.photos/seed/5/40/40' },
  ];

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-4 rounded-xl shadow-md text-center border border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">👋 ¡Bienvenido a la plataforma de aprendizaje!</h1>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Progress */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Progreso</h2>
          {coursesInProgress.length > 0 ? (
            <div className="space-y-4">
              {coursesInProgress.map(course => (
                <div key={course.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-800">{course.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${calculateProgress(course)}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{calculateProgress(course)}% completado</p>
                    <button
                        onClick={() => onSelectCourse(course)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Continuar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aún no has comenzado ningún curso.</p>
              <p className="text-sm">¡Explora y empieza a aprender!</p>
            </div>
          )}
        </section>

        {/* Right Column: Classification */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Clasificación</h2>
          <ul className="space-y-3">
            {rankingData.map((user, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name.includes('(Tú)') ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="font-bold text-gray-600 w-8 text-lg">{getMedal(index)}</span>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                  <span className="font-medium text-gray-800">{user.name}</span>
                </div>
                <span className="font-semibold text-blue-600">{user.score} pts</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
