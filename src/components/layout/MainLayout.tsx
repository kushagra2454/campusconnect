import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { ToastContainer } from '../ui/ToastContainer';
import { AIAssistantModal } from '../../features/ai-assistant/AIAssistantModal';
import { CreatePostModal } from '../../features/feed/CreatePostModal';
import { 
  Home, Compass, Users2, HelpCircle, BookOpen, 
  Briefcase, MessageSquare, PlusCircle 
} from 'lucide-react';

export const MainLayout: React.FC = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-gray-100 flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body Shell */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto pb-16 lg:pb-0">
        {/* Left Sidebar */}
        <Sidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />

        {/* Center Main Content Outlet */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-t border-gray-800 flex items-center justify-around py-2 px-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1 text-[10px] ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400'
            }`
          }
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/questions"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1 text-[10px] ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400'
            }`
          }
        >
          <HelpCircle className="w-4 h-4" />
          <span>Ask Senior</span>
        </NavLink>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40"
          aria-label="Create Post"
        >
          <PlusCircle className="w-5 h-5" />
        </button>

        <NavLink
          to="/resources"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1 text-[10px] ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400'
            }`
          }
        >
          <BookOpen className="w-4 h-4" />
          <span>PYQs</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1 text-[10px] ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400'
            }`
          }
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
        </NavLink>
      </nav>

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <AIAssistantModal />
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};
