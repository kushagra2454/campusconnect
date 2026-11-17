import React, { useState } from 'react';
import { useApp } from '../../lib/store';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { PostType } from '../../types';
import { 
  Sparkles, MessageSquare, HelpCircle, Award, 
  Briefcase, Filter, Search, PlusCircle, BookOpen 
} from 'lucide-react';

export const FeedPage: React.FC = () => {
  const { posts, currentUser, searchQuery, setIsAiModalOpen } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<PostType>('discussion');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesType = selectedType === 'all' || post.post_type === selectedType;
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.display_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filterTabs = [
    { id: 'all', label: 'All Updates', icon: Sparkles },
    { id: 'discussion', label: 'Discussions', icon: MessageSquare },
    { id: 'question', label: 'Questions & Advice', icon: HelpCircle },
    { id: 'experience', label: 'Senior Guidance', icon: Award },
    { id: 'opportunity', label: 'Opportunities', icon: Briefcase },
  ];

  const handleOpenComposer = (type: PostType) => {
    setCreateModalType(type);
    setIsCreateOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6 px-4">
      {/* Welcome Banner & Quick Action Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Welcome back, {currentUser.display_name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Explore peer questions, verified notes, and advice from {currentUser.university?.name || 'your campus'}.
            </p>
          </div>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-medium hover:bg-blue-600/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            AI Exam Finder
          </button>
        </div>

        {/* Quick Post Prompt */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={currentUser.avatar_path}
            alt={currentUser.display_name}
            className="w-9 h-9 rounded-xl object-cover ring-1 ring-blue-500/30"
          />
          <button
            onClick={() => handleOpenComposer('discussion')}
            className="flex-1 text-left bg-[#0D121F] hover:bg-gray-800/60 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-400 transition-all"
          >
            Ask a senior question, post an update, or find hackathon teammates...
          </button>
          <button
            onClick={() => handleOpenComposer('question')}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all shrink-0"
            title="Ask Question"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111827]/50 border border-gray-800 space-y-3">
            <Filter className="w-8 h-8 text-gray-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No updates matching this filter</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Be the first to start a conversation in this topic or ask seniors from your university branch!
            </p>
            <button
              onClick={() => handleOpenComposer('discussion')}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
            >
              Create First Post
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* Create Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        defaultType={createModalType}
      />
    </div>
  );
};
