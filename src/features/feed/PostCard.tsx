import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { Post, Comment } from '../../types';
import { ReportModal } from '../../components/moderation/ReportModal';
import { 
  Heart, MessageSquare, Share2, MoreHorizontal, Flag, Trash2, 
  CheckCircle2, Sparkles, Send, ShieldCheck, UserCheck, CornerDownRight
} from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    currentUser, likePost, deletePost, comments, addComment, 
    markHelpfulAnswer, showToast 
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const postComments = comments[post.id] || [];
  const isAuthor = currentUser.id === post.author_id;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  const getPostTypeBadge = (type: string) => {
    switch (type) {
      case 'question':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">Question</span>;
      case 'experience':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Senior Experience</span>;
      case 'opportunity':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">Opportunity</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30">Discussion</span>;
    }
  };

  return (
    <article className="p-5 rounded-2xl bg-[#111827]/90 border border-gray-800/90 shadow-xl hover:border-gray-700/80 transition-all space-y-4">
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.author.id}`} className="shrink-0">
            <img
              src={post.author.avatar_path}
              alt={post.author.display_name}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500/30"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/profile/${post.author.id}`} className="text-xs font-semibold text-white hover:text-blue-400 transition-colors">
                {post.author.display_name}
              </Link>
              {post.author.is_mentor && (
                <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <UserCheck className="w-2.5 h-2.5" /> Mentor
                </span>
              )}
              {post.author.role === 'moderator' && (
                <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <ShieldCheck className="w-2.5 h-2.5" /> Mod
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {post.author.branch} • Year {post.author.study_year} • {post.author.university?.short_code || 'University'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getPostTypeBadge(post.post_type)}
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-[#0E1522] border border-gray-800 rounded-xl shadow-xl py-1 z-20">
                <button
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-rose-400 hover:bg-gray-800 flex items-center gap-2 text-left"
                >
                  <Flag className="w-3.5 h-3.5" /> Report Post
                </button>
                {isAuthor && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2 text-left"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Context & Title */}
      <div>
        {post.community && (
          <Link
            to={`/communities/${post.community.slug}`}
            className="text-[11px] font-medium text-blue-400 hover:text-blue-300 inline-block mb-1.5"
          >
            c/{post.community.name}
          </Link>
        )}
        {post.title && (
          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
            {post.title}
          </h3>
        )}
        <p className="text-xs sm:text-sm text-gray-300 mt-2 whitespace-pre-line leading-relaxed">
          {post.body}
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-gray-800/80 text-gray-300 border border-gray-700/60 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Post Actions Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800/80 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all ${
              post.is_liked
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${post.is_liked ? 'fill-current' : ''}`} />
            <span>{post.likes_count}</span>
          </button>

          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all ${
              isCommentsOpen
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{postComments.length || post.comments_count} {post.post_type === 'question' ? 'Answers' : 'Comments'}</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast('Post link copied to clipboard!', 'info');
          }}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Expandable Comments & Answers Section */}
      {isCommentsOpen && (
        <div className="pt-4 border-t border-gray-800/80 space-y-4 animate-in fade-in">
          {/* New Comment Composer */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={post.post_type === 'question' ? 'Write an answer or senior guidance...' : 'Write a constructive comment...'}
              className="flex-1 bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1 transition-all"
            >
              <Send className="w-3 h-3" />
              <span>Reply</span>
            </button>
          </form>

          {/* List of comments */}
          <div className="space-y-3">
            {postComments.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-3">No replies yet. Be the first to share guidance!</p>
            ) : (
              postComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    comment.is_helpful
                      ? 'bg-emerald-950/20 border-emerald-800/60 shadow-md shadow-emerald-950/30'
                      : 'bg-gray-900/50 border-gray-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/profile/${comment.author.id}`} className="font-semibold text-white hover:text-blue-400">
                        {comment.author.display_name}
                      </Link>
                      {comment.author.is_mentor && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-blue-500/20 text-blue-300">
                          Mentor
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500">Year {comment.author.study_year}</span>
                    </div>

                    {/* Question Author "Mark as helpful" badge / action */}
                    {post.post_type === 'question' && (
                      <button
                        onClick={() => markHelpfulAnswer(post.id, comment.id)}
                        disabled={!isAuthor}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                          comment.is_helpful
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isAuthor
                            ? 'text-gray-400 hover:text-emerald-300 hover:bg-emerald-950/20'
                            : 'hidden'
                        }`}
                        title={isAuthor ? "Mark as helpful answer" : "Marked helpful by author"}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{comment.is_helpful ? 'Helpful Answer' : 'Mark Helpful'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-gray-300 mt-2 whitespace-pre-line leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="post"
        targetId={post.id}
        targetPreview={post.title || post.body}
      />
    </article>
  );
};
