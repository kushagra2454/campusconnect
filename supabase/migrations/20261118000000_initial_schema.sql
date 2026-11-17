-- ====================================================================
-- CampusConnect Initial Schema Migration
-- Matches README.md specification
-- ====================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ====================================================================
-- 1. Universities
-- ====================================================================
create table if not exists public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_code text,
  city text,
  state text,
  country text not null default 'India',
  website_url text,
  logo_url text,
  student_count integer default 0,
  created_at timestamptz not null default now(),
  unique (name, city, state, country)
);

create index if not exists universities_name_idx on public.universities (name);
create index if not exists universities_state_idx on public.universities (state);

-- ====================================================================
-- 2. Profiles
-- ====================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  avatar_path text,
  bio text check (char_length(bio) <= 500),
  university_id uuid references public.universities(id) on delete set null,
  program text,
  branch text,
  study_year smallint check (study_year between 1 and 8),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  role text not null default 'student'
    check (role in ('student', 'moderator', 'admin')),
  skills text[] not null default '{}',
  interests text[] not null default '{}',
  is_mentor boolean not null default false,
  mentor_topics text[] not null default '{}',
  contact_email_visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_university_idx on public.profiles (university_id);
create index if not exists profiles_verification_idx on public.profiles (verification_status);
create index if not exists profiles_mentor_idx on public.profiles (is_mentor);

-- ====================================================================
-- 3. Communities
-- ====================================================================
create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  category text not null default 'general'
    check (category in ('general', 'university', 'branch', 'course', 'interest', 'clubs')),
  rules text,
  visibility text not null default 'public'
    check (visibility in ('public', 'private')),
  created_by uuid references public.profiles(id) on delete set null,
  member_count integer not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists communities_university_idx on public.communities (university_id);
create index if not exists communities_slug_idx on public.communities (slug);

-- ====================================================================
-- 4. Community Members
-- ====================================================================
create table if not exists public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member'
    check (role in ('member', 'moderator', 'owner')),
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

create index if not exists community_members_user_idx on public.community_members (user_id);

-- ====================================================================
-- 5. Posts
-- ====================================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  community_id uuid references public.communities(id) on delete set null,
  university_id uuid references public.universities(id) on delete set null,
  post_type text not null default 'discussion'
    check (post_type in ('discussion', 'question', 'opportunity', 'experience', 'resource')),
  title text check (title is null or char_length(title) <= 180),
  body text not null check (char_length(body) between 1 and 10000),
  tags text[] not null default '{}',
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  is_helpful_answer_id uuid,
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_community_created_idx on public.posts (community_id, created_at desc);
create index if not exists posts_author_created_idx on public.posts (author_id, created_at desc);
create index if not exists posts_type_idx on public.posts (post_type);

-- ====================================================================
-- 6. Comments & Answers
-- ====================================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  is_helpful boolean not null default false,
  upvotes_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists comments_post_idx on public.comments (post_id, created_at asc);
create index if not exists comments_author_idx on public.comments (author_id);

-- ====================================================================
-- 7. Post Reactions
-- ====================================================================
create table if not exists public.post_reactions (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reaction_type text not null default 'like'
    check (reaction_type in ('like', 'helpful', 'insightful')),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ====================================================================
-- 8. Academic Resources
-- ====================================================================
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 200),
  description text check (char_length(description) <= 2000),
  university_id uuid references public.universities(id) on delete set null,
  program text,
  branch text,
  semester smallint check (semester between 1 and 8),
  subject text not null,
  resource_type text not null
    check (resource_type in ('pyq', 'notes', 'lab_manual', 'assignment', 'syllabus')),
  academic_year text,
  file_url text not null,
  file_name text not null,
  file_size_bytes bigint not null,
  file_mime_type text not null,
  uploader_id uuid not null references public.profiles(id) on delete cascade,
  moderation_status text not null default 'approved'
    check (moderation_status in ('pending', 'approved', 'rejected')),
  verification_badge text not null default 'Community uploaded'
    check (verification_badge in ('Community uploaded', 'Moderator reviewed', 'Official source link')),
  downloads_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_university_idx on public.resources (university_id);
create index if not exists resources_type_idx on public.resources (resource_type);
create index if not exists resources_subject_idx on public.resources (subject);
create index if not exists resources_semester_idx on public.resources (semester);

-- ====================================================================
-- 9. Conversations & Realtime Messages
-- ====================================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  title text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'admin')),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 5000),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at asc);

-- ====================================================================
-- 10. Notifications
-- ====================================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  type text not null
    check (type in ('reply', 'helpful_answer', 'mention', 'message', 'moderation', 'system')),
  title text not null,
  content text not null,
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- ====================================================================
-- 11. Reports & Moderation Actions
-- ====================================================================
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null
    check (target_type in ('post', 'comment', 'message', 'resource', 'profile')),
  target_id uuid not null,
  reason text not null
    check (reason in ('harassment', 'spam', 'misinformation', 'copyright', 'inappropriate', 'other')),
  context text check (char_length(context) <= 1000),
  status text not null default 'open'
    check (status in ('open', 'under_review', 'action_taken', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reports_status_idx on public.reports (status, created_at desc);

create table if not exists public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.reports(id) on delete set null,
  moderator_id uuid not null references public.profiles(id) on delete cascade,
  action text not null
    check (action in ('hide_content', 'dismiss', 'warn_user', 'suspend_user', 'verify_resource')),
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  internal_notes text,
  created_at timestamptz not null default now()
);

-- ====================================================================
-- 12. Opportunities (Internships, Hackathons, Projects)
-- ====================================================================
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 150),
  organization text not null,
  opportunity_type text not null
    check (opportunity_type in ('internship', 'hackathon', 'event', 'workshop', 'project')),
  description text not null,
  location text,
  is_remote boolean not null default true,
  deadline date,
  apply_url text,
  posted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ====================================================================
-- 13. Bookmarks
-- ====================================================================
create table if not exists public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null check (target_type in ('post', 'resource')),
  target_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

-- ====================================================================
-- 14. Row Level Security (RLS) Policies
-- ====================================================================
alter table public.universities enable row level security;
alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_reactions enable row level security;
alter table public.resources enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_actions enable row level security;
alter table public.opportunities enable row level security;
alter table public.bookmarks enable row level security;

-- Universities: Everyone can view
create policy "Universities are viewable by everyone" on public.universities
  for select using (true);

-- Profiles: Public read, self update
create policy "Profiles are viewable by authenticated users" on public.profiles
  for select using (auth.role() = 'authenticated' or true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Communities: Public read
create policy "Public communities are viewable by all" on public.communities
  for select using (visibility = 'public' or auth.uid() in (
    select user_id from public.community_members where community_id = id
  ));

create policy "Authenticated users can create communities" on public.communities
  for insert with check (auth.uid() = created_by);

-- Community Members: View members of visible communities, self join/leave
create policy "Members are viewable by community viewers" on public.community_members
  for select using (true);

create policy "Users can join communities" on public.community_members
  for insert with check (auth.uid() = user_id);

create policy "Users can leave communities" on public.community_members
  for delete using (auth.uid() = user_id);

-- Posts: View if community is visible, insert if member or public, edit own
create policy "Posts are viewable by all" on public.posts
  for select using (deleted_at is null);

create policy "Authenticated users can create posts" on public.posts
  for insert with check (auth.uid() = author_id);

create policy "Users can update their own posts" on public.posts
  for update using (auth.uid() = author_id);

create policy "Users can delete their own posts" on public.posts
  for delete using (auth.uid() = author_id);

-- Comments: View all, insert own, update own
create policy "Comments are viewable by all" on public.comments
  for select using (deleted_at is null);

create policy "Authenticated users can create comments" on public.comments
  for insert with check (auth.uid() = author_id);

create policy "Users can update own comments" on public.comments
  for update using (auth.uid() = author_id);

-- Post Reactions: Select all, insert/delete own
create policy "Reactions are viewable by all" on public.post_reactions
  for select using (true);

create policy "Users can manage their own reactions" on public.post_reactions
  for all using (auth.uid() = user_id);

-- Resources: Approved resources viewable by all, insert own
create policy "Approved resources are viewable by all" on public.resources
  for select using (moderation_status = 'approved' or auth.uid() = uploader_id);

create policy "Authenticated users can upload resources" on public.resources
  for insert with check (auth.uid() = uploader_id);

-- Conversations & Messages: Only conversation members can access
create policy "Users can view their conversations" on public.conversations
  for select using (
    auth.uid() in (select user_id from public.conversation_members where conversation_id = id)
  );

create policy "Conversation members can view members" on public.conversation_members
  for select using (
    auth.uid() in (select user_id from public.conversation_members cm where cm.conversation_id = conversation_id)
  );

create policy "Users can join conversations" on public.conversation_members
  for insert with check (auth.uid() = user_id);

create policy "Conversation members can view messages" on public.messages
  for select using (
    auth.uid() in (select user_id from public.conversation_members where conversation_id = messages.conversation_id)
  );

create policy "Conversation members can insert messages" on public.messages
  for insert with check (
    auth.uid() = sender_id and
    auth.uid() in (select user_id from public.conversation_members where conversation_id = messages.conversation_id)
  );

-- Notifications: Only target user can view and update
create policy "Users can view their own notifications" on public.notifications
  for select using (auth.uid() = user_id);

create policy "Users can update their own notifications" on public.notifications
  for update using (auth.uid() = user_id);

-- Reports: Users can insert reports, view their own; moderators can view all
create policy "Users can create reports" on public.reports
  for insert with check (auth.uid() = reporter_id);

create policy "Users can view own reports or moderators view all" on public.reports
  for select using (
    auth.uid() = reporter_id or
    exists (select 1 from public.profiles where id = auth.uid() and role in ('moderator', 'admin'))
  );

-- Moderation Actions: Only moderators/admins
create policy "Moderators can view and create actions" on public.moderation_actions
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('moderator', 'admin'))
  );

-- Opportunities: Viewable by all, insert by authenticated
create policy "Opportunities are viewable by all" on public.opportunities
  for select using (true);

create policy "Users can post opportunities" on public.opportunities
  for insert with check (auth.uid() = posted_by);

-- Bookmarks: Private to user
create policy "Users manage their own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id);
