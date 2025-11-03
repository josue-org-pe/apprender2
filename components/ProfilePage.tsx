import React from 'react';
import { Course } from '../types';

interface ProfilePageProps {
  courses: Course[];
  progress: Record<number, Set<number>>;
  onSelectCourse: (course: Course) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ courses, progress, onSelectCourse }) => {

  const coursesInProgress = courses.filter(course => progress[course.id] && progress[course.id].size > 0);
  const coursesCompleted = courses.filter(course => progress[course.id] && progress[course.id].size === course.topics.length).length;

  const calculateProgress = (course: Course) => {
    const completedTopics = progress[course.id]?.size || 0;
    const totalTopics = course.topics.length;
    if (totalTopics === 0) return 0;
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const achievements = [
    { name: 'Pionero del Álgebra', icon: '🏆' },
    { name: 'Maestro de la Aritmética', icon: '🥇' },
    { name: 'Físico Principiante', icon: '⚛️' },
    { name: 'Estudiante Dedicado', icon: '📚' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">

      {/* Profile Header */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-center space-x-6">
        <img src="https://picsum.photos/seed/user/100/100" alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-blue-500" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Usuario Actual</h1>
          <p className="text-gray-600">usuario@email.com</p>
          <span className="mt-2 inline-block text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Miembro Premium</span>
        </div>
      </section>

      {/* Key Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 text-center">
            <p className="text-4xl font-bold text-blue-600">{coursesCompleted}</p>
            <p className="text-gray-600 font-medium">Cursos Completados</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 text-center">
            <p className="text-4xl font-bold text-blue-600">1980</p>
            <p className="text-gray-600 font-medium">Puntos del Gym</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 text-center">
            <p className="text-4xl font-bold text-blue-600">#4</p>
            <p className="text-gray-600 font-medium">Rango Actual</p>
        </div>
      </section>

      {/* Courses in Progress */}
       <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cursos en Progreso</h2>
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
              <p>No tienes cursos en progreso.</p>
            </div>
          )}
        </section>

      {/* Achievements */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Logros</h2>
        <div className="flex flex-wrap gap-4">
            {achievements.map((ach, index) => (
                <div key={index} className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-2xl mr-3">{ach.icon}</span>
                    <span className="font-medium text-gray-700">{ach.name}</span>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default ProfilePage;