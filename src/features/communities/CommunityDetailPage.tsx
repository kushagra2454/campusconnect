import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { PostCard } from '../feed/PostCard';
import { CreatePostModal } from '../feed/CreatePostModal';
import { 
  Users2, ShieldCheck, ArrowLeft, PlusCircle, 
  Building2, BookOpen, AlertCircle, Sparkles 
} from 'lucide-react';

export const CommunityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { communities, posts, joinCommunity, leaveCommunity } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const community = communities.find(c => c.slug === slug) || communities[0];
  const communityPosts = posts.filter(p => p.community_id === community?.id);

  if (!community) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-base font-semibold text-white">Community not found</h2>
        <Link to="/communities" className="text-xs text-blue-400 mt-2 inline-block">
          Return to Communities Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      <Link to="/communities" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to all communities
      </Link>

      {/* Community Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {community.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Users2 className="w-3.5 h-3.5" />
                {community.member_count} enrolled members
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              {community.name}
            </h1>

            {community.university && (
              <p className="text-xs text-blue-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {community.university.name} ({community.university.city}, {community.university.state})
              </p>
            )}

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => community.is_member ? leaveCommunity(community.id) : joinCommunity(community.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                community.is_member
                  ? 'bg-gray-800 text-gray-300 hover:bg-rose-950/50 hover:text-rose-300 border border-gray-700'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
              }`}
            >
              {community.is_member ? 'Joined Community' : 'Join Community'}
            </button>

            {community.is_member && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-medium transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            )}
          </div>
        </div>

        {/* Community Rules Box */}
        {community.rules && (
          <div className="p-3.5 rounded-xl bg-[#0D121F] border border-gray-800 text-xs text-gray-300 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Community Ground Rules</span>
            </div>
            <p className="text-gray-400 whitespace-pre-line text-[11px] leading-relaxed">
              {community.rules}
            </p>
          </div>
        )}
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
            Community Discussions ({communityPosts.length})
          </h2>
        </div>

        {communityPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111827]/40 border border-gray-800 space-y-3">
            <AlertCircle className="w-8 h-8 text-gray-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No discussions yet in this space</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Start the first thread! Ask for class notes, course review, or hackathon collaboration.
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
            >
              Create First Thread
            </button>
          </div>
        ) : (
          communityPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* Post Modal with this community preselected */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
