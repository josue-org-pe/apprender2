
import React, { useState } from 'react';
import { Meeting } from '../types';
import MeetingCard from './MeetingCard';
import CreateMeetingModal from './CreateMeetingModal';

// Mock data for meetings
const initialMeetings: Meeting[] = [
  {
    id: 1,
    title: 'Resolución de dudas: Ecuaciones Lineales',
    course: 'Álgebra',
    time: '2024-07-25T18:00:00Z',
    participants: 3,
    maxParticipants: 10,
    host: 'Ana Martinez',
    link: 'https://meet.google.com/qwe-rty-uio',
  },
  {
    id: 2,
    title: 'Grupo de estudio: Leyes de Newton',
    course: 'Física',
    time: '2024-07-26T16:30:00Z',
    participants: 5,
    maxParticipants: 8,
    host: 'Carlos Rodriguez',
    link: 'https://zoom.us/j/1234567890',
  },
  {
    id: 3,
    title: 'Práctica de Factorización',
    course: 'Álgebra',
    time: '2024-07-27T10:00:00Z',
    participants: 7,
    maxParticipants: 15,
    host: 'Elena García',
    link: 'https://meet.google.com/asd-fgh-jkl',
  },
];

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateMeeting = (newMeetingData: Omit<Meeting, 'id'>) => {
    const newMeeting: Meeting = {
      ...newMeetingData,
      id: meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1,
    };
    setMeetings(prev => [...prev, newMeeting]);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Meetings de Estudio</h1>
            <p className="text-gray-600 mt-1">Únete a una sesión o crea la tuya para estudiar en grupo.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Crear Meeting
        </button>
      </div>

      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">No hay meetings programados</h3>
            <p className="mt-1 text-sm text-gray-500">
                Sé el primero en crear uno y empieza a colaborar.
            </p>
        </div>
      )}

      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateMeeting}
      />
    </div>
  );
};

export default MeetingPage;