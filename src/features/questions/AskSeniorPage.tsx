import React, { useState } from 'react';
import { useApp } from '../../lib/store';
import { PostCard } from '../feed/PostCard';
import { CreatePostModal } from '../feed/CreatePostModal';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HelpCircle, UserCheck, MessageCircle, Filter, Plus, 
  Sparkles, CheckCircle2, Search, ArrowRight 
} from 'lucide-react';

export const AskSeniorPage: React.FC = () => {
  const { posts, users, startDirectChat, searchQuery } = useApp();
  const navigate = useNavigate();

  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'unanswered' | 'helpful'>('all');

  const mentors = users.filter(u => u.is_mentor);

  // Filter only question-type posts
  const questions = posts.filter(p => p.post_type === 'question');

  const filteredQuestions = questions.filter(q => {
    const matchesBranch = selectedBranch === 'all' || q.author.branch?.toLowerCase().includes(selectedBranch.toLowerCase());
    const matchesMode = filterMode === 'all' 
      ? true 
      : filterMode === 'helpful' 
      ? Boolean(q.is_helpful_answer_id) 
      : q.comments_count === 0;
    const matchesSearch = !searchQuery || 
      q.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesBranch && matchesMode && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-purple-950/40 border border-blue-900/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Senior Mentorship
              </span>
              <span className="text-xs text-gray-400">• Cross-University</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Ask a Senior
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Get battle-tested guidance from 3rd & 4th year seniors on subjects, end-sem prep, branch electives, and campus placements.
            </p>
          </div>

          <button
            onClick={() => setIsAskOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* Senior Mentors Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Available Senior Mentors</h2>
          </div>
          <span className="text-[11px] text-gray-400">{mentors.length} active seniors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="p-4 rounded-xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <Link to={`/profile/${mentor.id}`} className="flex items-center gap-3 group">
                  <img
                    src={mentor.avatar_path}
                    alt={mentor.display_name}
                    className="w-11 h-11 rounded-xl object-cover ring-1 ring-blue-500/30 group-hover:ring-blue-400"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      {mentor.display_name}
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      {mentor.branch} • Year {mentor.study_year}
                    </p>
                    <p className="text-[10px] text-gray-500">{mentor.university?.name}</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    startDirectChat(mentor);
                    navigate('/messages');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center gap-1 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>

              {mentor.mentor_topics.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-gray-800/80">
                  <p className="text-[10px] font-medium text-gray-400 mb-1.5">Mentors on:</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.mentor_topics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-blue-950/40 text-blue-300 border border-blue-900/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Mode Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            All Questions ({questions.length})
          </button>
          <button
            onClick={() => setFilterMode('helpful')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterMode === 'helpful' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Solved / Helpful Answer
          </button>
          <button
            onClick={() => setFilterMode('unanswered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'unanswered' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            Needs Answers
          </button>
        </div>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-[#111827] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
        >
          <option value="all">All Departments / Branches</option>
          <option value="Computer Science">Computer Science & Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics">Electronics & Communication</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="First Year">Common First Year</option>
        </select>
      </div>

      {/* Question Threads List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111827]/40 border border-gray-800 space-y-3">
            <HelpCircle className="w-8 h-8 text-gray-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No questions found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Have a doubt regarding your syllabus, faculty review, or exam marking? Ask seniors now!
            </p>
            <button
              onClick={() => setIsAskOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
            >
              Ask Senior Now
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <PostCard key={q.id} post={q} />
          ))
        )}
      </div>

      {/* Ask Modal */}
      <CreatePostModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        defaultType="question"
      />
    </div>
  );
};
