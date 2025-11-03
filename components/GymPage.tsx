import React, { useState } from 'react';

// Mock data for the problems. In a real application, this would come from a backend.
const problems = [
  { 
    id: 1, 
    course: 'Álgebra', 
    topic: 'Ecuaciones lineales', 
    title: 'Resuelve para la variable x en la siguiente ecuación: 2x + 5 = 15', 
    difficulty: 'Fácil',
    points: 10 
  },
  { 
    id: 2, 
    course: 'Aritmética', 
    topic: 'Fracciones y decimales', 
    title: 'Calcula el resultado de la siguiente operación de fracciones: 3/4 + 1/2. Expresa el resultado como una fracción.', 
    difficulty: 'Fácil',
    points: 10 
  },
  { 
    id: 3, 
    course: 'Física', 
    topic: 'Leyes de Newton', 
    title: 'Si una fuerza neta de 20 N actúa sobre un objeto con una masa de 5 kg, ¿cuál es su aceleración en m/s²?', 
    difficulty: 'Medio',
    points: 15 
  },
   { 
    id: 4, 
    course: 'Álgebra', 
    topic: 'Factorización', 
    title: 'Factoriza completamente la siguiente expresión cuadrática: x² - 5x + 6.', 
    difficulty: 'Medio',
    points: 20
  },
];

const GymPage: React.FC = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [solution, setSolution] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentProblem = problems[currentProblemIndex];

  const handleSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSolution(e.target.value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!solution.trim() && !selectedFile) return;

    setIsLoading(true);
    setFeedback(null);

    // Simulate an API call and grading process
    setTimeout(() => {
      // In a real scenario, you'd validate the solution. Here, we'll randomize the result.
      const isCorrect = Math.random() > 0.4; // 60% chance of being correct

      if (isCorrect) {
        setFeedback({ 
          message: `¡Correcto! Has ganado ${currentProblem.points} puntos para tu clasificación.`, 
          type: 'success' 
        });
        // NOTE: To make this functional, a state lifting mechanism would be needed.
        // A function like `updateUserScore(currentProblem.points)` would be passed from App.tsx
        // to update the user's score globally.
      } else {
        setFeedback({ 
          message: 'Respuesta incorrecta. ¡No te rindas, revisa tu solución y vuelve a intentarlo!', 
          type: 'error' 
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const navigateProblem = (direction: 'next' | 'prev') => {
    const totalProblems = problems.length;
    const newIndex = direction === 'next'
      ? (currentProblemIndex + 1) % totalProblems
      : (currentProblemIndex - 1 + totalProblems) % totalProblems;
    
    setCurrentProblemIndex(newIndex);
    setSolution('');
    setSelectedFile(null);
    setFeedback(null);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in-up max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Gym de Desafíos</h1>
      <p className="text-gray-600 mb-6">Pon a prueba tus habilidades y gana puntos para la clasificación.</p>

      {/* Problem Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{currentProblem.course}</span>
          <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{currentProblem.topic}</span>
          <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{currentProblem.difficulty}</span>
          <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{currentProblem.points} Puntos</span>
        </div>
        <p className="text-lg text-gray-800 font-medium">{currentProblem.title}</p>
      </div>

      {/* Solution Submission */}
      <div>
        <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-2">
          Escribe tu respuesta
        </label>
        <textarea
          id="solution"
          rows={5}
          value={solution}
          onChange={handleSolutionChange}
          placeholder="Escribe tu respuesta o código aquí..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          disabled={isLoading}
        />
        <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Subir archivo</span>
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
            {selectedFile && (
                <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <span>{selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Eliminar archivo">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
          feedback.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <button 
            onClick={() => navigateProblem('prev')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            ← Anterior
          </button>
           <button 
            onClick={() => navigateProblem('next')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Siguiente →
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isLoading || (!solution.trim() && !selectedFile)}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calificando...
            </>
          ) : (
            'Enviar Solución'
          )}
        </button>
      </div>
    </div>
  );
};

export default GymPage;