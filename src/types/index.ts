export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type UserRole = 'student' | 'moderator' | 'admin';
export type PostType = 'discussion' | 'question' | 'opportunity' | 'experience' | 'resource';
export type ResourceType = 'pyq' | 'notes' | 'lab_manual' | 'assignment' | 'syllabus';
export type VerificationBadge = 'Community uploaded' | 'Moderator reviewed' | 'Official source link';
export type ReportReason = 'harassment' | 'spam' | 'misinformation' | 'copyright' | 'inappropriate' | 'other';
export type ReportStatus = 'open' | 'under_review' | 'action_taken' | 'dismissed';
export type ModerationActionType = 'hide_content' | 'dismiss' | 'warn_user' | 'suspend_user' | 'verify_resource';
export type OpportunityType = 'internship' | 'hackathon' | 'event' | 'workshop' | 'project';

export interface University {
  id: string;
  name: string;
  short_code: string;
  city: string;
  state: string;
  country: string;
  website_url?: string;
  logo_url?: string;
  student_count: number;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string;
  avatar_path?: string;
  bio?: string;
  university_id?: string;
  university?: University;
  program?: string;
  branch?: string;
  study_year?: number;
  verification_status: VerificationStatus;
  role: UserRole;
  skills: string[];
  interests: string[];
  is_mentor: boolean;
  mentor_topics: string[];
  contact_email_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Community {
  id: string;
  university_id?: string;
  university?: University;
  name: string;
  slug: string;
  description: string;
  category: 'general' | 'university' | 'branch' | 'course' | 'interest' | 'clubs';
  rules?: string;
  visibility: 'public' | 'private';
  created_by?: string;
  member_count: number;
  is_member?: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author: Profile;
  community_id?: string;
  community?: Community;
  university_id?: string;
  post_type: PostType;
  title?: string;
  body: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  is_helpful_answer_id?: string;
  is_pinned?: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author: Profile;
  parent_id?: string;
  body: string;
  is_helpful: boolean;
  upvotes_count: number;
  is_upvoted?: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  university_id?: string;
  university?: University;
  program?: string;
  branch?: string;
  semester: number;
  subject: string;
  resource_type: ResourceType;
  academic_year?: string;
  file_url: string;
  file_name: string;
  file_size_bytes: number;
  file_mime_type: string;
  uploader_id: string;
  uploader: Profile;
  moderation_status: 'pending' | 'approved' | 'rejected';
  verification_badge: VerificationBadge;
  downloads_count: number;
  is_bookmarked?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender: Profile;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  is_group: boolean;
  title?: string;
  created_by?: string;
  members: Profile[];
  last_message?: Message;
  unread_count?: number;
  created_at: string;
  updated_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  actor_id?: string;
  actor?: Profile;
  type: 'reply' | 'helpful_answer' | 'mention' | 'message' | 'moderation' | 'system';
  title: string;
  content: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reporter: Profile;
  target_type: 'post' | 'comment' | 'message' | 'resource' | 'profile';
  target_id: string;
  target_preview?: string;
  reason: ReportReason;
  context?: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface ModerationAction {
  id: string;
  report_id?: string;
  moderator_id: string;
  moderator: Profile;
  action: ModerationActionType;
  target_type: string;
  target_id: string;
  reason: string;
  internal_notes?: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  opportunity_type: OpportunityType;
  description: string;
  location?: string;
  is_remote: boolean;
  deadline?: string;
  apply_url?: string;
  posted_by?: string;
  created_at: string;
}
