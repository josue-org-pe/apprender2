
import React from 'react';
import { Meeting } from '../types';

interface MeetingCardProps {
  meeting: Meeting;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const meetingTime = new Date(meeting.time);

  const isFull = meeting.participants >= meeting.maxParticipants;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{meeting.course}</span>
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0010 11s-4 0-4 4a6.97 6.97 0 00-1.5 4.33A5 5 0 0010 21s4 0 4-4c0-.34-.024-.673-.07-1z" />
            </svg>
            <span>{meeting.participants} / {meeting.maxParticipants}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{meeting.title}</h3>
        <p className="text-sm text-gray-600 mb-4">Organizado por: <span className="font-medium">{meeting.host}</span></p>
        
        <div className="text-sm text-gray-500">
          <p><strong>Fecha:</strong> {meetingTime.toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {meetingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <a
          href={isFull ? undefined : meeting.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => { if(isFull) e.preventDefault() }}
          aria-disabled={isFull}
          className={`block w-full text-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            isFull
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isFull ? 'Sala llena' : 'Unirse al Meeting'}
        </a>
      </div>
    </div>
  );
};

export default MeetingCard;