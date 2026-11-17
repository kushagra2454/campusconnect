import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { PostCard } from '../feed/PostCard';
import { Modal } from '../../components/ui/Modal';
import { 
  Building2, GraduationCap, UserCheck, ShieldCheck, 
  BookOpen, Heart, Bookmark, Edit3, MessageCircle, Mail
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, users, posts, resources, startDirectChat, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'resources' | 'bookmarks'>('posts');
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Edit form state
  const [bio, setBio] = useState(currentUser.bio || '');
  const [skillsInput, setSkillsInput] = useState(currentUser.skills.join(', '));
  const [interestsInput, setInterestsInput] = useState(currentUser.interests.join(', '));

  const profile = users.find(u => u.id === id) || (id === currentUser.id ? currentUser : users[0]);
  const isOwnProfile = currentUser.id === profile.id;

  const userPosts = posts.filter(p => p.author_id === profile.id);
  const userResources = resources.filter(r => r.uploader_id === profile.id);
  const bookmarkedResources = resources.filter(r => r.is_bookmarked);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.bio = bio;
    currentUser.skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    currentUser.interests = interestsInput.split(',').map(s => s.trim()).filter(Boolean);
    showToast('Profile updated successfully!', 'success');
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      {/* Profile Header Banner */}
      <div className="rounded-2xl bg-[#111827] border border-gray-800 overflow-hidden shadow-xl">
        {/* Cover Graphic */}
        <div className="h-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={profile.avatar_path}
                alt={profile.display_name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#111827] shadow-xl bg-gray-900"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    {profile.display_name}
                  </h1>
                  {profile.is_mentor && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      <UserCheck className="w-3 h-3" /> Senior Mentor
                    </span>
                  )}
                  {profile.role === 'moderator' && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <ShieldCheck className="w-3 h-3" /> Moderator
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Student Verified
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 flex-wrap">
                  <span>{profile.program}</span>
                  <span>•</span>
                  <span>{profile.branch}</span>
                  <span>•</span>
                  <span>Year {profile.study_year}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium border border-gray-700 transition-colors w-full sm:w-auto justify-center"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => startDirectChat(profile)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mt-2">
              {profile.bio}
            </p>
          )}

          {/* Academic Affiliation */}
          <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center gap-6 text-xs text-gray-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>{profile.university?.name || 'Apex Institute of Technology'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Class of {2026 + (4 - (profile.study_year || 1))}</span>
            </div>
            {profile.contact_email_visible && (
              <div className="flex items-center gap-1.5 text-blue-400">
                <Mail className="w-4 h-4" />
                <span>Contact visible to peers</span>
              </div>
            )}
          </div>

          {/* Skills and Mentor Topics */}
          <div className="mt-4 space-y-3">
            {profile.is_mentor && profile.mentor_topics.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Mentoring Topics:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.mentor_topics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Skills & Tools:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Activity Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'posts'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Posts & Answers</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full">{userPosts.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'resources'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Shared Resources</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full">{userResources.length}</span>
        </button>

        {isOwnProfile && (
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Saved Bookmarks</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full">{bookmarkedResources.length}</span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {activeTab === 'posts' && (
          userPosts.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-8">No posts published yet.</p>
          ) : (
            userPosts.map(p => <PostCard key={p.id} post={p} />)
          )
        )}

        {activeTab === 'resources' && (
          userResources.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-8">No study documents uploaded yet.</p>
          ) : (
            userResources.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-[#111827] border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{r.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {r.subject} • Sem {r.semester} • {r.downloads_count} downloads
                  </p>
                </div>
                <span className="text-xs font-medium text-emerald-400">{r.verification_badge}</span>
              </div>
            ))
          )
        )}

        {activeTab === 'bookmarks' && (
          bookmarkedResources.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-8">No bookmarked resources saved.</p>
          ) : (
            bookmarkedResources.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-[#111827] border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{r.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {r.subject} • Sem {r.semester} • {r.downloads_count} downloads
                  </p>
                </div>
                <Link to="/resources" className="text-xs text-blue-400 hover:underline">
                  View in Library
                </Link>
              </div>
            ))
          )
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Student Profile"
        description="Update your bio, skills, and areas of interest."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">About / Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Skills (Comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Interests (Comma separated)</label>
            <input
              type="text"
              value={interestsInput}
              onChange={(e) => setInterestsInput(e.target.value)}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
