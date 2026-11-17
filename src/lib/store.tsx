import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Profile, Community, Post, Comment, Resource, Conversation, Message, 
  NotificationItem, Report, Opportunity, PostType, ResourceType, ReportReason, ModerationActionType
} from '../types';
import { 
  mockProfiles, mockUniversities, mockCommunities, mockPosts, 
  mockComments, mockResources, mockConversations, mockMessages, 
  mockNotifications, mockOpportunities, mockReports 
} from './mock-data';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: Profile;
  switchUser: (userId: string) => void;
  users: Profile[];
  
  // Feed & Posts
  posts: Post[];
  createPost: (data: { title?: string; body: string; post_type: PostType; community_id?: string; tags: string[] }) => void;
  likePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  
  // Comments & Q&A
  comments: Record<string, Comment[]>;
  addComment: (postId: string, body: string) => void;
  markHelpfulAnswer: (postId: string, commentId: string) => void;
  
  // Communities
  communities: Community[];
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;
  
  // Resources
  resources: Resource[];
  uploadResource: (data: {
    title: string;
    description: string;
    university_id?: string;
    program?: string;
    branch?: string;
    semester: number;
    subject: string;
    resource_type: ResourceType;
    academic_year?: string;
    fileName: string;
    fileSize: number;
  }) => void;
  toggleBookmarkResource: (resourceId: string) => void;
  downloadResource: (resourceId: string) => void;
  
  // Messaging
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  startDirectChat: (targetUser: Profile) => string;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Moderation & Reports
  reports: Report[];
  submitReport: (data: {
    target_type: 'post' | 'comment' | 'message' | 'resource' | 'profile';
    target_id: string;
    target_preview?: string;
    reason: ReportReason;
    context?: string;
  }) => void;
  handleModerationAction: (reportId: string, action: ModerationActionType, notes?: string) => void;
  
  // Opportunities
  opportunities: Opportunity[];
  
  // UI & Feedback
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Global search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // AI Modal
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;

  // Onboarding
  isOnboarded: boolean;
  completeOnboarding: (data: {
    university_id: string;
    program: string;
    branch: string;
    study_year: number;
    skills: string[];
    interests: string[];
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (default: Rohan Verma, 1st year student)
  const [currentUserId, setCurrentUserId] = useState<string>('p3');
  const [users, setUsers] = useState<Profile[]>(mockProfiles);
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Feed & Comments
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Record<string, Comment[]>>(mockComments);
  
  // Communities
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  
  // Resources
  const [resources, setResources] = useState<Resource[]>(mockResources);
  
  // Messaging
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv1');
  
  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  
  // Reports
  const [reports, setReports] = useState<Report[]>(mockReports);
  
  // Opportunities
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  
  // Search & Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(true);
  
  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    const target = users.find(u => u.id === userId);
    showToast(`Switched account to: ${target?.display_name} (${target?.role})`, 'info');
  };

  const createPost = ({ title, body, post_type, community_id, tags }: {
    title?: string;
    body: string;
    post_type: PostType;
    community_id?: string;
    tags: string[];
  }) => {
    const targetCommunity = communities.find(c => c.id === community_id);
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author_id: currentUser.id,
      author: currentUser,
      community_id,
      community: targetCommunity,
      university_id: currentUser.university_id,
      post_type,
      title: title || undefined,
      body,
      tags,
      likes_count: 0,
      comments_count: 0,
      is_liked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('Post published successfully to community feed!', 'success');
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.is_liked;
        return {
          ...post,
          is_liked: isLiked,
          likes_count: isLiked ? post.likes_count + 1 : Math.max(0, post.likes_count - 1),
        };
      }
      return post;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post removed', 'info');
  };

  const addComment = (postId: string, body: string) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      post_id: postId,
      author_id: currentUser.id,
      author: currentUser,
      body,
      is_helpful: false,
      upvotes_count: 0,
      is_upvoted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p));
    showToast('Comment posted', 'success');
  };

  const markHelpfulAnswer = (postId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || []).map(c => ({
        ...c,
        is_helpful: c.id === commentId ? !c.is_helpful : c.is_helpful,
      })),
    }));

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_helpful_answer_id: commentId } : p));
    showToast('Answer marked as helpful!', 'success');
  };

  const joinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return { ...c, is_member: true, member_count: c.member_count + 1 };
      }
      return c;
    }));
    showToast('Joined community!', 'success');
  };

  const leaveCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return { ...c, is_member: false, member_count: Math.max(0, c.member_count - 1) };
      }
      return c;
    }));
    showToast('Left community', 'info');
  };

  const uploadResource = (data: {
    title: string;
    description: string;
    university_id?: string;
    program?: string;
    branch?: string;
    semester: number;
    subject: string;
    resource_type: ResourceType;
    academic_year?: string;
    fileName: string;
    fileSize: number;
  }) => {
    const univ = mockUniversities.find(u => u.id === data.university_id) || currentUser.university;
    const newRes: Resource = {
      id: `res_${Date.now()}`,
      title: data.title,
      description: data.description,
      university_id: data.university_id || currentUser.university_id,
      university: univ,
      program: data.program || currentUser.program,
      branch: data.branch || currentUser.branch,
      semester: data.semester,
      subject: data.subject,
      resource_type: data.resource_type,
      academic_year: data.academic_year || '2025-2026',
      file_url: '#',
      file_name: data.fileName,
      file_size_bytes: data.fileSize,
      file_mime_type: 'application/pdf',
      uploader_id: currentUser.id,
      uploader: currentUser,
      moderation_status: 'approved',
      verification_badge: 'Community uploaded',
      downloads_count: 0,
      is_bookmarked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setResources(prev => [newRes, ...prev]);
    showToast('Resource uploaded and verified for student download!', 'success');
  };

  const toggleBookmarkResource = (resourceId: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === resourceId) {
        const nextState = !r.is_bookmarked;
        showToast(nextState ? 'Saved to bookmarks' : 'Removed from bookmarks', 'info');
        return { ...r, is_bookmarked: nextState };
      }
      return r;
    }));
  };

  const downloadResource = (resourceId: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === resourceId) {
        return { ...r, downloads_count: r.downloads_count + 1 };
      }
      return r;
    }));
    showToast('Downloading verified document...', 'success');
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      sender: currentUser,
      content,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          last_message: newMsg,
          updated_at: new Date().toISOString(),
        };
      }
      return c;
    }));

    // Senior peer auto-response simulation for realistic interactive chat
    if (conversationId === 'conv1' && currentUser.id === 'p3') {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `msg_reply_${Date.now()}`,
          conversation_id: conversationId,
          sender_id: 'p1',
          sender: mockProfiles[0],
          content: 'Got it! Also make sure to attend the Department Mock Placement interviews next month. They simulate the exact pressure of the actual rounds.',
          created_at: new Date().toISOString(),
        };
        setMessages(prev => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg],
        }));
        showToast('New message from Aarav Sharma', 'info');
      }, 1500);
    }
  };

  const startDirectChat = (targetUser: Profile) => {
    // Check if conversation already exists
    const existing = conversations.find(c => 
      !c.is_group && c.members.some(m => m.id === targetUser.id) && c.members.some(m => m.id === currentUser.id)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const newConvId = `conv_${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      is_group: false,
      title: `${targetUser.display_name} (${targetUser.is_mentor ? 'Mentor' : 'Student'})`,
      members: [currentUser, targetUser],
      unread_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({ ...prev, [newConvId]: [] }));
    setActiveConversationId(newConvId);
    return newConvId;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const submitReport = ({ target_type, target_id, target_preview, reason, context }: {
    target_type: 'post' | 'comment' | 'message' | 'resource' | 'profile';
    target_id: string;
    target_preview?: string;
    reason: ReportReason;
    context?: string;
  }) => {
    const newReport: Report = {
      id: `rep_${Date.now()}`,
      reporter_id: currentUser.id,
      reporter: currentUser,
      target_type,
      target_id,
      target_preview: target_preview || 'Flagged item',
      reason,
      context,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setReports(prev => [newReport, ...prev]);
    showToast('Report submitted privately to campus moderators. Thank you for keeping CampusConnect safe.', 'info');
  };

  const handleModerationAction = (reportId: string, action: ModerationActionType, notes?: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    if (action === 'hide_content') {
      if (report.target_type === 'post') {
        setPosts(prev => prev.filter(p => p.id !== report.target_id));
      } else if (report.target_type === 'resource') {
        setResources(prev => prev.filter(r => r.id !== report.target_id));
      }
    }

    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: action === 'dismiss' ? 'dismissed' : 'action_taken',
          updated_at: new Date().toISOString(),
        };
      }
      return r;
    }));

    showToast(`Moderator action applied: ${action.replace('_', ' ')}`, 'success');
  };

  const completeOnboarding = (data: {
    university_id: string;
    program: string;
    branch: string;
    study_year: number;
    skills: string[];
    interests: string[];
  }) => {
    const univ = mockUniversities.find(u => u.id === data.university_id);
    const updatedProfile: Profile = {
      ...currentUser,
      university_id: data.university_id,
      university: univ,
      program: data.program,
      branch: data.branch,
      study_year: data.study_year,
      skills: data.skills,
      interests: data.interests,
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedProfile : u));
    setIsOnboarded(true);
    showToast('Profile and onboarding complete! Welcome to CampusConnect.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        users,
        posts,
        createPost,
        likePost,
        deletePost,
        comments,
        addComment,
        markHelpfulAnswer,
        communities,
        joinCommunity,
        leaveCommunity,
        resources,
        uploadResource,
        toggleBookmarkResource,
        downloadResource,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startDirectChat,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        reports,
        submitReport,
        handleModerationAction,
        opportunities,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        isAiModalOpen,
        setIsAiModalOpen,
        isOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
