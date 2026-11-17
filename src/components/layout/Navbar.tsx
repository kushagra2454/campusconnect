import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { 
  GraduationCap, Search, Sparkles, Bell, UserCheck, 
  ChevronDown, ShieldCheck, CheckCheck, ExternalLink, X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, users, switchUser, searchQuery, setSearchQuery, 
    notifications, markNotificationRead, markAllNotificationsRead,
    setIsAiModalOpen 
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const navigate = useNavigate();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800/80 px-4 lg:px-8 h-16 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              CampusConnect
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full">
                MVP
              </span>
            </span>
            <p className="text-[11px] text-gray-400 font-normal hidden sm:block">
              Your University. Your People.
            </p>
          </div>
        </Link>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search PYQs, subjects, topics, or students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111827] border border-gray-800 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-3">
        {/* AI Assistant Button */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium hover:border-blue-500/60 transition-all glow-hover"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/60 border border-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-800/60 max-h-72 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">No notifications yet</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.link) navigate(notif.link);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${
                        notif.is_read ? 'hover:bg-gray-800/40 opacity-75' : 'bg-blue-950/20 hover:bg-blue-950/40 border border-blue-900/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white">{notif.title}</p>
                        {!notif.is_read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notif.content}</p>
                      <span className="text-[10px] text-gray-500 mt-1.5 block">
                        {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Demo Account Switcher & Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/60 hover:bg-gray-800/60 transition-all text-left"
          >
            <img
              src={currentUser.avatar_path}
              alt={currentUser.display_name}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-500/30"
            />
            <div className="hidden xl:block">
              <p className="text-xs font-medium text-white flex items-center gap-1 leading-tight">
                {currentUser.display_name}
                {currentUser.role === 'moderator' && (
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                )}
                {currentUser.is_mentor && (
                  <UserCheck className="w-3 h-3 text-blue-400" />
                )}
              </p>
              <p className="text-[10px] text-gray-400 capitalize">{currentUser.role} • {currentUser.branch?.split(' ')[0]}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-gray-800 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Demo Account Switcher</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Switch personas to test permissions & workflows:</p>
              </div>

              <div className="space-y-1">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                      user.id === currentUser.id
                        ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <img
                      src={user.avatar_path}
                      alt={user.display_name}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-white truncate">{user.display_name}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                          user.role === 'admin'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : user.role === 'moderator'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : user.is_mentor
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {user.is_mentor ? 'Mentor' : user.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">
                        Year {user.study_year} • {user.university?.short_code}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center px-1">
                <Link
                  to={`/profile/${currentUser.id}`}
                  onClick={() => setIsUserMenuOpen(false)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                >
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="text-[10px] text-gray-500">Fast Evaluator Mode</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
