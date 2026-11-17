import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../lib/store';
import { PostType } from '../../types';
import { MessageSquare, HelpCircle, Briefcase, Award, Plus, Sparkles } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: PostType;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'discussion',
}) => {
  const { currentUser, communities, createPost, showToast } = useApp();

  const [postType, setPostType] = useState<PostType>(defaultType);
  const [communityId, setCommunityId] = useState<string>(communities[0]?.id || '');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      showToast('Please enter post content', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    createPost({
      title: title.trim() || undefined,
      body: body.trim(),
      post_type: postType,
      community_id: communityId || undefined,
      tags,
    });

    setTitle('');
    setBody('');
    setTagsInput('');
    onClose();
  };

  const types: { id: PostType; label: string; icon: any; color: string }[] = [
    { id: 'discussion', label: 'Discussion', icon: MessageSquare, color: 'text-blue-400' },
    { id: 'question', label: 'Question / Ask a Senior', icon: HelpCircle, color: 'text-amber-400' },
    { id: 'experience', label: 'Senior Experience / Review', icon: Award, color: 'text-emerald-400' },
    { id: 'opportunity', label: 'Opportunity / Teammate', icon: Briefcase, color: 'text-purple-400' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Post or Question"
      description={`Posting as ${currentUser.display_name} (${currentUser.branch}, Year ${currentUser.study_year})`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Post Type Selector */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-2">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {types.map(t => {
              const Icon = t.icon;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setPostType(t.id)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${
                    postType === t.id
                      ? 'bg-blue-600/20 border-blue-500/60 text-white shadow-md'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${t.color}`} />
                  <span className="text-[11px] font-medium leading-tight">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Community Picker */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">Select Community</label>
          <select
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Public Campus Feed (All Universities)</option>
            {communities.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">
            {postType === 'question' ? 'Question Title *' : 'Title (Optional)'}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              postType === 'question'
                ? 'e.g. How to prepare for Operating Systems mid-sems in 3 weeks?'
                : postType === 'opportunity'
                ? 'e.g. Looking for React Developer for Smart India Hackathon'
                : 'Brief summary of what you are sharing...'
            }
            required={postType === 'question'}
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Body TextArea */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">Content *</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              postType === 'question'
                ? 'Explain what you have already tried, syllabus unit, and specific areas where you need guidance...'
                : 'Write your post, guidance, or details...'
            }
            rows={5}
            required
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">Tags (Comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. FirstYear, EnggMaths, ExamPrep"
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>
      </form>
    </Modal>
  );
};
