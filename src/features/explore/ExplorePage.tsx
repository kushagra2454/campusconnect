import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { mockUniversities } from '../../lib/mock-data';
import { 
  Compass, Building2, Users, Search, GraduationCap, 
  MapPin, ExternalLink, UserCheck, MessageCircle 
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { users, startDirectChat, searchQuery } = useApp();
  const [activeTab, setActiveTab] = useState<'universities' | 'students'>('universities');

  const filteredUniversities = mockUniversities.filter(u =>
    !searchQuery ||
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = users.filter(s =>
    !searchQuery ||
    s.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.branch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase())) ||
    s.university?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Directory
          </span>
          <span className="text-xs text-gray-400">• Higher Education Network</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Explore Campuses & Student Peers
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
          Discover accredited institutions, cross-campus engineering branches, senior mentors, and student collaborators.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('universities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'universities'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Universities ({filteredUniversities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Students & Mentors ({filteredStudents.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'universities' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredUniversities.map((univ) => (
            <div
              key={univ.id}
              className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {univ.short_code}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {univ.name}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    {univ.city}, {univ.state}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {univ.student_count.toLocaleString()} registered students
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <Link
                  to="/communities"
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Communities
                </Link>
                <a
                  href={univ.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white p-1 rounded-lg"
                  title="Official Website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <Link to={`/profile/${student.id}`} className="flex items-start gap-3 group">
                  <img
                    src={student.avatar_path}
                    alt={student.display_name}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-blue-500/30 group-hover:ring-blue-400"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      {student.display_name}
                      {student.is_mentor && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-blue-500/20 text-blue-300">
                          Mentor
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {student.branch} • Year {student.study_year}
                    </p>
                    <p className="text-[10px] text-gray-500">{student.university?.name}</p>
                  </div>
                </Link>

                <button
                  onClick={() => startDirectChat(student)}
                  className="p-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs"
                  title="Message"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>

              {student.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-800/80">
                  {student.skills.slice(0, 4).map((sk, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded-md bg-gray-800 text-gray-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
