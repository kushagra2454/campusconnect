import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { Users, Sparkles, MessageCircle, ArrowRight, Calendar, ShieldCheck } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { users, communities, joinCommunity, leaveCommunity, startDirectChat, opportunities } = useApp();
  const navigate = useNavigate();

  // Find senior mentors
  const mentors = users.filter(u => u.is_mentor);

  return (
    <aside className="w-80 shrink-0 hidden xl:flex flex-col gap-6 py-6 px-4 border-l border-gray-800/80 bg-[#0B0F19]/40 min-h-[calc(100vh-4rem)]">
      {/* 1. Senior Mentors Directory */}
      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold text-white tracking-wide uppercase">Senior Mentors</h3>
          </div>
          <Link to="/questions" className="text-[11px] text-blue-400 hover:text-blue-300 font-medium">
            View All
          </Link>
        </div>

        <div className="space-y-3 divide-y divide-gray-800/60">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="pt-2.5 first:pt-0">
              <div className="flex items-center justify-between">
                <Link to={`/profile/${mentor.id}`} className="flex items-center gap-2.5 group">
                  <img
                    src={mentor.avatar_path}
                    alt={mentor.display_name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-500/30 group-hover:ring-blue-400"
                  />
                  <div>
                    <p className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      {mentor.display_name}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    </p>
                    <p className="text-[10px] text-gray-400 truncate w-32">
                      Year {mentor.study_year} • {mentor.branch?.split(' ')[0]}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    startDirectChat(mentor);
                    navigate('/messages');
                  }}
                  className="p-1.5 rounded-lg bg-blue-600/15 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center gap-1"
                  title="Direct Message Mentor"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>

              {mentor.mentor_topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {mentor.mentor_topics.slice(0, 2).map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Suggested Communities */}
      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-semibold text-white tracking-wide uppercase">Active Communities</h3>
          </div>
          <Link to="/communities" className="text-[11px] text-blue-400 hover:text-blue-300 font-medium">
            Explore
          </Link>
        </div>

        <div className="space-y-3">
          {communities.slice(0, 3).map((comm) => (
            <div key={comm.id} className="flex items-center justify-between gap-2">
              <Link to={`/communities/${comm.slug}`} className="overflow-hidden group">
                <p className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                  {comm.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {comm.member_count} members • {comm.category}
                </p>
              </Link>

              <button
                onClick={() => comm.is_member ? leaveCommunity(comm.id) : joinCommunity(comm.id)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                  comm.is_member
                    ? 'bg-gray-800 text-gray-400 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-900 border border-transparent'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                }`}
              >
                {comm.is_member ? 'Joined' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Upcoming Hackathons & Deadlines */}
      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white tracking-wide uppercase">Upcoming Deadlines</h3>
          </div>
          <Link to="/opportunities" className="text-[11px] text-blue-400 hover:text-blue-300 font-medium">
            All
          </Link>
        </div>

        <div className="space-y-2.5">
          {opportunities.slice(0, 2).map((opp) => (
            <div key={opp.id} className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80">
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                opp.opportunity_type === 'internship' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-500/20 text-purple-300'
              }`}>
                {opp.opportunity_type}
              </span>
              <p className="text-xs font-medium text-white mt-1 line-clamp-1">{opp.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Deadline: {opp.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Trust & Safety Note */}
      <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/40 flex items-start gap-2.5 text-blue-300">
        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed text-blue-200/90">
          <p className="font-semibold text-blue-300">Academic Integrity First</p>
          <p className="text-blue-200/70 mt-0.5">
            Never upload leaked exam papers. Verify all peer advice with your department guidelines.
          </p>
        </div>
      </div>
    </aside>
  );
};
