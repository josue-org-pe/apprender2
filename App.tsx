import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';
import CursosDisponibles from './components/CursosDisponibles';
import MisCursos from './components/MisCursos';
import CursoPage from './components/CursoPage';
import { Course, CourseView, Page } from './types';
import { COURSES_DATA } from './constants';
import HomePage from './components/HomePage';
import MeetingPage from './components/MeetingPage';
import GymPage from './components/GymPage';
import MaterialsPage from './components/MaterialsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';

const App: React.FC = () => {
  const [currentCourseView, setCurrentCourseView] = useState<CourseView>(CourseView.AVAILABLE);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favoriteCourseIds, setFavoriteCourseIds] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('favoriteCourses');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [progress, setProgress] = useState<Record<number, Set<number>>>(() => {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(courseId => {
        parsed[courseId] = new Set(parsed[courseId]);
      });
      return parsed;
    }
    return {};
  });

  useEffect(() => {
    const serializableProgress: Record<number, number[]> = {};
    Object.keys(progress).forEach(courseId => {
      serializableProgress[Number(courseId)] = Array.from(progress[Number(courseId)]);
    });
    localStorage.setItem('courseProgress', JSON.stringify(serializableProgress));
  }, [progress]);


  useEffect(() => {
    localStorage.setItem('favoriteCourses', JSON.stringify(Array.from(favoriteCourseIds)));
  }, [favoriteCourseIds]);

  const handleToggleFavorite = (courseId: number) => {
    setFavoriteCourseIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(courseId)) {
        newIds.delete(courseId);
      } else {
        newIds.add(courseId);
      }
      return newIds;
    });
  };
  
  const handleCompleteTopic = (courseId: number, topicId: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const courseProgress = new Set(newProgress[courseId] || []);
      courseProgress.add(topicId);
      newProgress[courseId] = courseProgress;
      return newProgress;
    });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage(Page.COURSES);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };
  
  const handleSetCurrentPage = (page: Page) => {
    if (page !== Page.COURSES) {
      setSelectedCourse(null);
    }
    if (page === Page.COURSES) {
      setCurrentCourseView(CourseView.AVAILABLE);
    }
    setCurrentPage(page);
  };


  const favoriteCourses = COURSES_DATA.filter(course => favoriteCourseIds.has(course.id));

  const renderContent = () => {
    if (selectedCourse && currentPage === Page.COURSES) {
      return (
        <CursoPage 
          course={selectedCourse} 
          onBack={handleBackToList}
          progress={progress[selectedCourse.id] || new Set()}
          onCompleteTopic={handleCompleteTopic}
        />
      );
    }

    switch (currentPage) {
      case Page.HOME:
        return (
          <HomePage 
            courses={COURSES_DATA}
            progress={progress}
            onSelectCourse={handleSelectCourse}
          />
        );
      case Page.COURSES:
        return (
          <>
            <Header 
              currentView={currentCourseView} 
              setCurrentView={setCurrentCourseView}
            />
            <div className="mt-6">
              {currentCourseView === CourseView.AVAILABLE ? (
                <CursosDisponibles
                  courses={COURSES_DATA}
                  onSelectCourse={handleSelectCourse}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteCourseIds={favoriteCourseIds}
                />
              ) : (
                <MisCursos
                  courses={favoriteCourses}
                  onSelectCourse={handleSelectCourse}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteCourseIds={favoriteCourseIds}
                />
              )}
            </div>
          </>
        );
      case Page.MEETING:
        return <MeetingPage />;
      case Page.GYM:
        return <GymPage />;
      case Page.MATERIALS:
        return <MaterialsPage />;
      case Page.PROFILE:
        return <ProfilePage 
                courses={COURSES_DATA}
                progress={progress}
                onSelectCourse={handleSelectCourse}
               />;
      case Page.SETTINGS:
        return <SettingsPage />;
      default:
        return <HomePage 
                  courses={COURSES_DATA}
                  progress={progress}
                  onSelectCourse={handleSelectCourse}
                />;
    }
  };

  const isCoursePage = selectedCourse && currentPage === Page.COURSES;
  const isLibraryPage = currentPage === Page.MATERIALS;

  return (
    <div className="flex flex-row-reverse h-screen bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isCoursePage && (
            <TopHeader 
                onMenuClick={() => setIsSidebarOpen(true)}
                currentPage={currentPage}
                setCurrentPage={handleSetCurrentPage} 
            />
        )}
        <main className={`flex-1 overflow-y-auto no-scrollbar ${isCoursePage || isLibraryPage ? '' : 'p-6 md:p-8'}`}>
          {renderContent()}
        </main>
        {!isCoursePage && <Footer />}
      </div>
    </div>
  );
};

export default App;