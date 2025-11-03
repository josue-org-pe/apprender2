import React, { useState } from 'react';
import { Course } from '../types';

interface CursoPageProps {
  course: Course;
  onBack: () => void;
  progress: Set<number>;
  onCompleteTopic: (courseId: number, topicId: number) => void;
}

const CursoPage: React.FC<CursoPageProps> = ({ course, onBack, progress, onCompleteTopic }) => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const handleCompleteAndContinue = () => {
    onCompleteTopic(course.id, selectedTopicIndex);
    if (selectedTopicIndex < course.topics.length - 1) {
      setSelectedTopicIndex(selectedTopicIndex + 1);
    }
  };

  const isLastTopic = selectedTopicIndex === course.topics.length - 1;
  const isTopicCompleted = progress.has(selectedTopicIndex);

  return (
    <div className="flex h-screen bg-white">
      {/* Course Navigation Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b h-16 flex items-center">
            <button
                onClick={onBack}
                className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a la lista de cursos
            </button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto no-scrollbar">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Temario del curso</h2>
            <ul className="space-y-2">
            {course.topics.map((topic, index) => {
                const isUnlocked = index === 0 || progress.has(index - 1);
                return (
                    <li key={topic.id}>
                        <button
                            onClick={() => setSelectedTopicIndex(index)}
                            disabled={!isUnlocked}
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${
                                selectedTopicIndex === index
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-200'
                            } ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                selectedTopicIndex === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-700'
                            } ${progress.has(index) ? 'bg-green-500 text-white' : ''}`}>
                                {progress.has(index) ? '✔' : index + 1}
                            </div>
                            <span className="ml-3 text-sm">{topic.name.split(':')[1].trim()}</span>
                             {!isUnlocked && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </li>
                )
            })}
            </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{course.name}</h1>
            <p className="text-lg text-gray-600 mb-8">{course.description}</p>
            
            <div className="border-t border-gray-200 pt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.topics[selectedTopicIndex].name}</h2>
                <div className="prose lg:prose-xl text-gray-700 space-y-4">
                    <p>
                        Este es el espacio donde se mostrará el contenido detallado para <strong>{course.topics[selectedTopicIndex].name.toLowerCase()}</strong>.
                        Aquí puedes incluir videos, texto, imágenes, ejercicios interactivos y cualquier otro material de aprendizaje relevante para el tema.
                    </p>
                    <p>
                        Por ejemplo, para la <strong>semana {selectedTopicIndex + 1}</strong>, podríamos tener una introducción al tema, seguida de ejemplos prácticos y una pequeña evaluación para comprobar el conocimiento adquirido.
                    </p>
                    <img src={`https://picsum.photos/seed/${course.id}${selectedTopicIndex}/800/400`} alt="Placeholder" className="rounded-lg shadow-md" />
                    <blockquote>
                        La clave del éxito en {course.name} es la práctica constante y la resolución de problemas.
                    </blockquote>
                </div>
                 <div className="mt-12">
                  {!isTopicCompleted ? (
                    <button 
                      onClick={handleCompleteAndContinue}
                      className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {isLastTopic ? 'Finalizar Curso' : 'Completar tema y continuar →'}
                    </button>
                  ) : (
                     <div className="p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">¡Tema completado!</span>
                    </div>
                  )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CursoPage;