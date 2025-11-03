// FIX: Removed a self-import of 'Page' which was causing a declaration conflict.
export interface Topic {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  topics: Topic[];
}

export enum CourseView {
  AVAILABLE = 'AVAILABLE',
  MY_COURSES = 'MY_COURSES',
}

export enum Page {
  HOME = 'HOME',
  COURSES = 'COURSES',
  MEETING = 'MEETING',
  GYM = 'GYM',
  MATERIALS = 'MATERIALS',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
}

export interface Meeting {
  id: number;
  title: string;
  course: string;
  time: string;
  participants: number;
  maxParticipants: number;
  host: string;
  link: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  type: 'PDF' | 'Libro' | 'Video';
  url: string;
  courseId: number;
}
