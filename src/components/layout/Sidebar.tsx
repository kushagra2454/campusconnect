import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { 
  Home, Compass, Users2, HelpCircle, BookOpen, 
  Briefcase, MessageSquare, User, ShieldAlert, PlusCircle,
  Building2, Sparkles
} from 'lucide-react';

interface SidebarProps {
  onOpenCreatePost: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenCreatePost }) => {
  const { currentUser, setIsAiModalOpen } = useApp();

  const navItems = [
    { label: 'Home Feed', icon: Home, to: '/' },
    { label: 'Explore', icon: Compass, to: '/explore' },
    { label: 'Communities', icon: Users2, to: '/communities' },
    { label: 'Ask a Senior', icon: HelpCircle, to: '/questions' },
    { label: 'Resources & PYQs', icon: BookOpen, to: '/resources' },
    { label: 'Opportunities', icon: Briefcase, to: '/opportunities' },
    { label: 'Messages', icon: MessageSquare, to: '/messages' },
    { label: 'My Profile', icon: User, to: `/profile/${currentUser.id}` },
  ];

  const isModOrAdmin = currentUser.role === 'moderator' || currentUser.role === 'admin';

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-6 px-4 border-r border-gray-800/80 bg-[#0B0F19]/50 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* User's University Badge Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-gray-900 to-[#111827] border border-gray-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              {currentUser.university?.name || 'Apex Institute of Tech'}
            </p>
            <p className="text-[10px] text-gray-400 truncate">
              {currentUser.program} • Year {currentUser.study_year}
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onOpenCreatePost}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/25 transition-all transform active:scale-98"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Post or Question</span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* Moderator Dashboard Tab (Visible for moderator / admin) */}
          {isModOrAdmin && (
            <NavLink
              to="/moderation"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                    : 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/20'
                }`
              }
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-purple-400" />
              <div className="flex items-center justify-between flex-1">
                <span>Moderator Hub</span>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-semibold uppercase">
                  Staff
                </span>
              </div>
            </NavLink>
          )}
        </nav>
      </div>

      {/* Footer Info & AI Quick Banner */}
      <div className="space-y-4 pt-6 border-t border-gray-800/80">
        <div 
          onClick={() => setIsAiModalOpen(true)}
          className="p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/40 cursor-pointer hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 group-hover:text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Resource Assistant</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
            Instant search for exam PYQs, lab manuals & syllabus summaries.
          </p>
        </div>

        <div className="text-[11px] text-gray-500 px-1 leading-normal">
          <p>CampusConnect v1.0 MVP</p>
          <p className="mt-0.5 text-gray-600">Built for Universities across India</p>
        </div>
      </div>
    </aside>
  );
};
