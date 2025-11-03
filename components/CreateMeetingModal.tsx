
import React, { useState } from 'react';
import { Meeting } from '../types';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (meetingData: Omit<Meeting, 'id'>) => void;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Álgebra');
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [dateTime, setDateTime] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateTime || !link) return;

    onCreate({
      title,
      course,
      time: new Date(dateTime).toISOString(),
      participants: 1, // The host is the first participant
      maxParticipants,
      host: 'Usuario (Tú)',
      link,
    });
    
    // Reset form and close modal
    setTitle('');
    setCourse('Álgebra');
    setMaxParticipants(10);
    setDateTime('');
    setLink('');
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg m-4 transform transition-all animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Crear un Nuevo Meeting</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100" aria-label="Cerrar modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Meeting</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Curso</label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Álgebra</option>
                <option>Aritmética</option>
                <option>Física</option>
              </select>
            </div>
             <div>
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
              <input
                type="datetime-local"
                id="datetime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link de la Reunión (Meet, Zoom, etc.)</label>
              <input
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Máximo de Participantes: {maxParticipants}</label>
              <input
                type="range"
                id="participants"
                min="2"
                max="50"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mr-3">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Crear Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetingModal;