# CampusConnect

> **Your University. Your People. Your Community.**\
> A multi-university student networking and knowledge-sharing platform
> combining professional student profiles, real-time communities, peer
> discussions, senior mentorship, and an academic resource library.

**Project status:** MVP specification and implementation-ready
repository README\
**Product type:** Full-stack web application\
**Primary audience:** University and college students, seniors, mentors,
and community moderators\
**Initial market:** Universities in India, with an architecture that can
support additional regions\
**Repository name:** `campusconnect`

------------------------------------------------------------------------

## Table of Contents

1.  [Product Overview](#1-product-overview)
2.  [Problem Statement](#2-problem-statement)
3.  [Product Vision and Goals](#3-product-vision-and-goals)
4.  [Target Users and Roles](#4-target-users-and-roles)
5.  [MVP Scope](#5-mvp-scope)
6.  [Out of Scope for MVP](#6-out-of-scope-for-mvp)
7.  [Core User Journeys](#7-core-user-journeys)
8.  [Functional Requirements](#8-functional-requirements)
9.  [Non-Functional Requirements](#9-non-functional-requirements)
10. [Technology Stack](#10-technology-stack)
11. [High-Level Architecture](#11-high-level-architecture)
12. [Repository Structure](#12-repository-structure)
13. [Data Model](#13-data-model)
14. [Database and Storage Design](#14-database-and-storage-design)
15. [Authentication and
    Authorization](#15-authentication-and-authorization)
16. [Realtime Messaging](#16-realtime-messaging)
17. [Academic Resource Library](#17-academic-resource-library)
18. [AI Features and Guardrails](#18-ai-features-and-guardrails)
19. [Security and Privacy](#19-security-and-privacy)
20. [Moderation and Trust](#20-moderation-and-trust)
21. [User Interface and
    Accessibility](#21-user-interface-and-accessibility)
22. [Environment Variables](#22-environment-variables)
23. [Local Development Setup](#23-local-development-setup)
24. [Database Setup and Migrations](#24-database-setup-and-migrations)
25. [Development Workflow](#25-development-workflow)
26. [Testing Strategy](#26-testing-strategy)
27. [CI/CD and Deployment](#27-cicd-and-deployment)
28. [Observability and Operations](#28-observability-and-operations)
29. [Acceptance Criteria](#29-acceptance-criteria)
30. [Demo and Seed Data](#30-demo-and-seed-data)
31. [Roadmap](#31-roadmap)
32. [Risks and Mitigations](#32-risks-and-mitigations)
33. [Contribution Guidelines](#33-contribution-guidelines)
34. [License and Legal Notes](#34-license-and-legal-notes)
35. [Product Principles](#35-product-principles)

------------------------------------------------------------------------

## 1. Product Overview

CampusConnect is a student-first digital community where people from
different universities can connect, exchange practical knowledge, and
access academic resources in one place.

The product combines:

-   **Professional networking:** student profiles, skills, projects,
    achievements, and connections.
-   **Community conversations:** university, course, branch, semester,
    and interest-based spaces.
-   **Real-time communication:** direct messages and group
    conversations.
-   **Peer knowledge:** questions, answers, discussions, and
    senior-to-junior guidance.
-   **Academic resources:** previous-year question papers (PYQs), notes,
    lab manuals, and other study documents.
-   **Opportunities:** internships, hackathons, events, workshops, and
    student projects.

CampusConnect is not intended to replace a university's official student
information system or learning management system. It is an independent
peer-to-peer network. University affiliation and content should be
represented accurately, and unverified claims must not be presented as
official university information.

### Product positioning

  Existing product pattern   What CampusConnect adopts
  -------------------------- ------------------------------------------------------
  LinkedIn                   Student identity, profiles, networking, achievements
  Discord                    Persistent communities, channels, live conversations
  Reddit / forums            Questions, answers, voting, topic discovery
  Academic repositories      Searchable, categorized learning resources
  Mentorship platforms       Senior-to-junior experience sharing

CampusConnect should combine these workflows without copying another
product's branding, interface, or proprietary assets.

------------------------------------------------------------------------

## 2. Problem Statement

Students often rely on disconnected WhatsApp groups, Telegram channels,
informal contacts, social media pages, and scattered cloud drives to
find information.

This creates recurring problems:

1.  Students cannot easily find seniors from their own university,
    course, or branch.
2.  Advice about faculty, subjects, examinations, internships, and
    placements is fragmented.
3.  PYQs, notes, and assignments are difficult to discover and verify.
4.  Useful discussions disappear inside fast-moving group chats.
5.  Students from different universities have limited ways to exchange
    experiences.
6.  New students may not know whom to approach for practical guidance.
7.  Resource uploads can be duplicated, mislabeled, outdated, or unsafe.

CampusConnect addresses these problems through structured communities,
searchable discussions, student profiles, mentorship, and categorized
resources.

------------------------------------------------------------------------

## 3. Product Vision and Goals

### Vision

Build a trusted, searchable, cross-university student network that makes
peer knowledge and student opportunities easier to discover.

### MVP goals

-   Let a student create an account and complete a useful profile.
-   Let students discover and join university communities.
-   Let members publish posts and participate in discussions.
-   Let students ask questions and receive answers from peers and
    seniors.
-   Let members upload, search, and download academic resources.
-   Let users exchange direct messages and participate in group
    conversations.
-   Give moderators practical tools to handle reports and harmful
    content.
-   Provide a small, safe AI assistant for resource discovery and
    summarization.

### Success metrics

Track product usefulness rather than vanity metrics alone.

  -----------------------------------------------------------------------
  Metric                              Definition
  ----------------------------------- -----------------------------------
  Activation rate                     New accounts that complete
                                      onboarding and join at least one
                                      community

  Weekly active students              Unique users active during a
                                      seven-day period

  Helpful answer rate                 Questions receiving at least one
                                      answer marked helpful

  Resource usefulness                 Resources downloaded or bookmarked
                                      relative to views

  Search success rate                 Searches that lead to a resource,
                                      post, or profile open

  Community participation             Members who post, comment, or reply
                                      in a period

  Report resolution time              Time from report creation to
                                      moderator action

  Retention                           Activated users who return in
                                      subsequent weeks
  -----------------------------------------------------------------------

Do not claim product-market fit based on a classroom demo or a small
test group.

------------------------------------------------------------------------

## 4. Target Users and Roles

### User personas

-   **First-year student:** needs orientation, subject guidance,
    resources, and a safe place to ask questions.
-   **Senior student:** wants to share experience, mentor juniors, and
    build a professional profile.
-   **Active contributor:** shares notes, answers questions, and
    participates in communities.
-   **Moderator:** keeps discussions relevant and handles reports.
-   **Platform administrator:** manages platform-wide configuration,
    university records, and moderator access.

### Roles and permissions

  -----------------------------------------------------------------------
  Role                                Typical permissions
  ----------------------------------- -----------------------------------
  Visitor                             View public landing page and public
                                      community previews

  Authenticated student               Manage own profile, join
                                      communities, post, comment, upload
                                      permitted resources, message
                                      according to privacy settings

  Verified student                    Student features plus a visible
                                      verification status

  Community moderator                 Moderate assigned communities,
                                      review reports, hide or remove
                                      content within scope

  Platform admin                      Manage universities, roles,
                                      platform settings, and escalated
                                      reports
  -----------------------------------------------------------------------

**Important:** Verification is a status, not a privilege to override
community rules. A verified student must still follow the same content
and safety policies.

------------------------------------------------------------------------

## 5. MVP Scope

The MVP should prioritize complete end-to-end workflows over a large
number of unfinished features.

### P0 --- Required for a credible MVP

  -----------------------------------------------------------------------
  Module                              MVP capability
  ----------------------------------- -----------------------------------
  Authentication                      Sign up, sign in, sign out,
                                      password reset

  Onboarding                          Select university, course, branch,
                                      study year, and interests

  Student profile                     Name, avatar, bio, university,
                                      program, skills, projects

  University directory                Browse and search universities

  Communities                         Discover, join, leave, and view
                                      university/course communities

  Social feed                         Create, edit, delete own posts;
                                      view feed; like and comment

  Discussions                         Ask questions, answer, reply, mark
                                      a helpful answer

  Resource library                    Upload, categorize, search, view
                                      metadata, and download files

  Messaging                           Direct and group conversations with
                                      realtime updates

  Notifications                       In-app alerts for relevant replies,
                                      mentions, and messages

  Reporting                           Report posts, comments, users, and
                                      resources

  Moderation                          Review reports and take scoped
                                      actions

  Responsive UI                       Usable on mobile, tablet, and
                                      desktop
  -----------------------------------------------------------------------

### P1 --- Include if time and reliability allow

-   AI-assisted resource search and document summaries.
-   Mentor discovery and senior experience tags.
-   Bookmarks and saved resources.
-   Internship, hackathon, and event posts.
-   University experience reviews with clear review context.
-   Search filters by university, course, branch, semester, and subject.

### MVP delivery rule

Do not mark a feature complete because its screen exists. A feature is
complete only when its data flow, permissions, validation, error states,
and tests work.

------------------------------------------------------------------------

## 6. Out of Scope for MVP

Avoid adding these until the core platform is stable:

-   Native Android and iOS applications.
-   Video calls, livestreaming, and voice rooms.
-   Payments, subscriptions, and marketplace transactions.
-   Automated job application submission.
-   Official university integrations without written authorization.
-   Public ranking of individual faculty members.
-   AI-generated academic answers presented as authoritative.
-   Complex recommendation or ranking algorithms.
-   Unmoderated anonymous messaging.
-   Large-scale file mirroring or unrestricted public file hosting.

------------------------------------------------------------------------

## 7. Core User Journeys

### Journey A: New student onboarding

1.  Student opens the landing page.
2.  Student creates an account using email and password or an enabled
    OAuth provider.
3.  Student verifies their email.
4.  Student completes profile details.
5.  Student selects university, program, branch, study year, and
    interests.
6.  Platform recommends relevant communities.
7.  Student joins at least one community.
8.  Student lands on a personalized feed.

**Expected result:** The student can discover relevant content without
manually searching every section.

### Journey B: Ask a senior

1.  Student opens the Ask a Senior section.
2.  Student filters by university, program, branch, and topic.
3.  Student views senior profiles and their stated experience.
4.  Student posts a question or starts a permitted conversation.
5.  A senior responds.
6.  The question author marks a useful answer as helpful.

**Trust requirement:** Clearly distinguish self-reported experience from
verified academic affiliation.

### Journey C: Share a PYQ

1.  Student opens Resources.
2.  Student chooses Upload.
3.  Student selects university, program, semester, subject, resource
    type, and academic year.
4.  Student uploads a supported document.
5.  Server validates file size, type, and authorization.
6.  Resource enters the configured moderation or review workflow.
7.  Approved resource becomes searchable.
8.  Another student previews metadata and downloads it.

**Trust requirement:** Display uploader, upload date, review status, and
reported-content action.

### Journey D: Join a community and chat

1.  Student discovers a community.
2.  Student reviews its description and rules.
3.  Student joins the community.
4.  Student reads channel or group discussions.
5.  Student sends a message.
6.  Authorized members receive realtime updates.
7.  Members can report inappropriate content.

### Journey E: Report harmful content

1.  Student selects Report on a post, comment, message, profile, or
    resource.
2.  Student chooses a reason and optionally adds context.
3.  Report is stored privately.
4.  Authorized moderator reviews the report.
5.  Moderator records an action and reason.
6.  Reporter can see an appropriate status update without being shown
    confidential moderation notes.

------------------------------------------------------------------------

## 8. Functional Requirements

### 8.1 Authentication and onboarding

-   Email/password authentication through the configured identity
    provider.
-   Email verification before enabling sensitive actions.
-   Password reset flow.
-   Protected routes and session refresh.
-   Profile completion flow.
-   Terms of Use and Privacy Policy acknowledgement.
-   Clear handling for duplicate email, invalid credentials, and expired
    sessions.

### 8.2 Profiles and networking

Profile fields:

-   Display name.
-   Profile photo.
-   Short bio.
-   University.
-   Degree/program.
-   Department or branch.
-   Study year or graduation year.
-   Skills and interests.
-   Projects and achievements (optional).
-   Profile visibility and contact preferences.

Users may edit only their own profile, except for explicitly authorized
moderation or administration actions. Do not expose personal email
addresses or private contact details by default.

### 8.3 Universities and communities

-   University directory with searchable names and locations.
-   Communities linked to a university or broader topic.
-   Community name, description, rules, visibility, and membership
    count.
-   Join/leave workflow.
-   Membership roles: member, moderator, owner.
-   Community-specific content access.
-   Prevent duplicate membership records.

A community should not imply official university endorsement unless that
relationship has been formally established.

### 8.4 Feed and posts

Post types:

-   General discussion.
-   Question.
-   Resource announcement.
-   Opportunity.
-   Experience or advice.

Requirements:

-   Create, edit, and delete own posts.
-   Add comments and replies.
-   Like/unlike posts.
-   Paginated or cursor-based feed.
-   Search and filters.
-   Report content.
-   Display author, community, and timestamp.
-   Use server-side authorization for all mutations.

Avoid relying on client-side hiding as a security control.

### 8.5 Questions and answers

-   Question title and detailed description.
-   Tags and category.
-   Optional university/course/semester context.
-   Answers and threaded comments (keep nesting shallow for MVP).
-   Question author can mark one answer as helpful.
-   Sort by recent, most helpful, and unanswered.
-   Report abusive or misleading answers.

### 8.6 Academic resources

Supported resource categories:

-   Previous-year question papers.
-   Lecture notes.
-   Lab manuals.
-   Assignments and practice material.
-   Syllabus and reference material.

Required metadata:

-   Title.
-   Description.
-   University.
-   Program/branch.
-   Semester.
-   Subject.
-   Resource type.
-   Academic year or examination session (optional).
-   Uploader.
-   Upload timestamp.
-   Moderation status.
-   File type and file size.

Requirements:

-   Enforce file size and allowed MIME types.
-   Store files in private storage by default.
-   Use short-lived signed download URLs where appropriate.
-   Scan files for malware using an appropriate scanning service before
    broad distribution.
-   Prevent path traversal and unsafe filenames.
-   Provide report and takedown workflows.
-   Detect likely duplicates using file hashes where feasible.
-   Never assume an uploaded document is accurate or authorized for
    redistribution.

### 8.7 Messaging

MVP messaging:

-   One-to-one conversations.
-   Small group conversations.
-   Conversation membership.
-   Realtime message delivery.
-   Message timestamps.
-   Basic unread state.
-   Message pagination.
-   Block/report controls.
-   Membership checks before reading or sending.

For reliability, persist messages before broadcasting updates. Realtime
subscriptions should not be the only source of truth.

### 8.8 Notifications

In-app notifications for:

-   Replies to a user's post or answer.
-   Mentions, if mentions are implemented.
-   New messages.
-   Community invitations or moderation updates.

Do not send notifications for every low-value event. Provide sensible
preferences and avoid exposing private message content in notification
previews.

### 8.9 Admin and moderation

-   Role-restricted moderation dashboard.
-   Report queue with status and reason.
-   View reported content and relevant context.
-   Hide/remove content within authorized scope.
-   Suspend or restrict accounts only with documented policy and
    appropriate authorization.
-   Audit log for moderation actions.
-   Escalation path for severe safety or legal issues.

------------------------------------------------------------------------

## 9. Non-Functional Requirements

  -----------------------------------------------------------------------
  Area                                Requirement
  ----------------------------------- -----------------------------------
  Security                            Server-side authorization, least
                                      privilege, secrets kept server-side

  Privacy                             Collect only data required for
                                      product functionality

  Performance                         Paginate feeds and messages; avoid
                                      loading entire collections

  Reliability                         Graceful error states and
                                      retry-safe mutations

  Accessibility                       Keyboard navigation, labels,
                                      contrast, visible focus

  Responsiveness                      Support common mobile, tablet, and
                                      desktop widths

  Maintainability                     Typed code, modular components,
                                      migrations, documented decisions

  Observability                       Structured errors and operational
                                      logs without sensitive content

  Scalability                         Indexed queries, bounded realtime
                                      channels, storage limits

  Data integrity                      Foreign keys, constraints,
                                      validation, and transactions where
                                      needed
  -----------------------------------------------------------------------

Suggested MVP performance targets (validate under realistic test
conditions):

-   Main application route should become usable within 3 seconds on a
    typical broadband connection.
-   Common indexed reads should generally complete within 500 ms at the
    application layer under light demo load.
-   No unbounded feed, message, or resource queries.
-   All user-facing mutations should show pending, success, and failure
    states.

These are engineering targets, not guarantees.

------------------------------------------------------------------------

## 10. Technology Stack

The following stack is recommended for a fast but maintainable MVP.

  -----------------------------------------------------------------------
  Layer                   Recommended technology  Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                React + TypeScript +    Web application
                          Vite                    

  Styling                 Tailwind CSS            Responsive design
                                                  system

  UI primitives           Accessible component    Consistent interface
                          library such as         components
                          shadcn/ui               

  Routing                 React Router            Client-side navigation

  Server state            TanStack Query          Fetching, caching,
                                                  invalidation

  Forms                   React Hook Form + Zod   Form state and
                                                  validation

  Backend platform        Supabase                Auth, PostgreSQL,
                                                  Realtime, Storage

  Database                PostgreSQL              Relational application
                                                  data

  AI provider             Gemini API through      Resource assistance and
                          server-side function    summaries

  Testing                 Vitest + React Testing  Unit, component, and
                          Library + Playwright    E2E tests

  Deployment              Vercel or equivalent    Frontend hosting

  Source control          Git + GitHub            Version control and
                                                  review

  CI                      GitHub Actions          Lint, typecheck, tests,
                                                  build
  -----------------------------------------------------------------------

### Architectural rules

-   Keep business logic out of large UI components.
-   Keep API access behind typed service modules.
-   Validate user input on both client and server.
-   Use database constraints in addition to frontend validation.
-   Never expose a Supabase service-role key or AI provider key in
    browser code.
-   Use Supabase Row Level Security (RLS) for user-data access.
-   Prefer database migrations checked into version control.
-   Keep provider-specific logic behind small interfaces where
    practical.

### Important implementation note

Supabase is a managed backend platform, but it does not remove the need
for backend security design. RLS policies, storage policies, function
authorization, and database grants must be explicitly configured and
tested.

------------------------------------------------------------------------

## 11. High-Level Architecture

``` text
                         ┌──────────────────────────┐
                         │       Web Client         │
                         │ React + TypeScript       │
                         │ Responsive UI            │
                         └────────────┬─────────────┘
                                      │ HTTPS
                                      ▼
                         ┌──────────────────────────┐
                         │ Supabase Client / API    │
                         │ Auth + RLS-protected DB  │
                         └──────┬──────────┬────────┘
                                │          │
                   ┌────────────┘          └─────────────┐
                   ▼                                     ▼
        ┌────────────────────┐                 ┌────────────────────┐
        │ PostgreSQL         │                 │ Supabase Storage   │
        │ Profiles, posts,   │                 │ PDFs, images,      │
        │ communities, chat  │                 │ avatars            │
        └─────────┬──────────┘                 └────────────────────┘
                  │
                  ▼
        ┌────────────────────┐
        │ Supabase Realtime  │
        │ Authorized changes │
        │ and chat updates   │
        └────────────────────┘

        ┌──────────────────────────────────────────────────────┐
        │ Supabase Edge Functions / trusted server functions   │
        │ AI requests, privileged workflows, validation,      │
        │ notifications, moderation integrations              │
        └───────────────────────┬──────────────────────────────┘
                                ▼
                     ┌────────────────────┐
                     │ Gemini API         │
                     │ Server-side only   │
                     └────────────────────┘
```

### Trust boundaries

1.  Browser input is untrusted.
2.  Authenticated identity must be established by the backend.
3.  Database access must be constrained by RLS and grants.
4.  Privileged operations must run in trusted server functions.
5.  AI output is untrusted generated content and must be labeled and
    validated.
6.  Uploaded files are untrusted until checked.

------------------------------------------------------------------------

## 12. Repository Structure

Recommended structure:

``` text
campusconnect/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── feed/
│   │   ├── community/
│   │   ├── messaging/
│   │   └── resources/
│   ├── features/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── profiles/
│   │   ├── universities/
│   │   ├── communities/
│   │   ├── posts/
│   │   ├── questions/
│   │   ├── resources/
│   │   ├── messaging/
│   │   ├── notifications/
│   │   ├── moderation/
│   │   └── ai-assistant/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── validation/
│   │   └── utils/
│   ├── services/
│   ├── types/
│   ├── styles/
│   └── main.tsx
├── supabase/
│   ├── migrations/
│   ├── functions/
│   │   ├── ai-resource-assistant/
│   │   └── moderation-workflow/
│   ├── seed.sql
│   └── config.toml
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── LICENSE
```

Keep feature modules cohesive. Avoid a single `components` directory
containing all business logic.

------------------------------------------------------------------------

## 13. Data Model

The schema below is a starting design. Implement it as
version-controlled SQL migrations and refine it as the product evolves.

### Core entities

  Entity                   Purpose
  ------------------------ --------------------------------------------
  `profiles`               Public student profile linked to auth user
  `universities`           University directory
  `academic_programs`      Programs, departments, branches
  `communities`            University, course, and interest groups
  `community_members`      Membership and community role
  `posts`                  Feed posts and questions
  `comments`               Comments and answers
  `post_reactions`         Likes or other supported reactions
  `resources`              Academic resource metadata
  `conversations`          Direct or group chat container
  `conversation_members`   Authorized conversation membership
  `messages`               Persisted chat messages
  `notifications`          In-app user notifications
  `reports`                User-submitted reports
  `moderation_actions`     Auditable moderator actions
  `user_blocks`            User blocking relationships
  `bookmarks`              Saved posts and resources

### Suggested relationships

``` text
auth.users 1 ─── 1 profiles
universities 1 ─── N profiles
universities 1 ─── N communities
communities 1 ─── N community_members
profiles 1 ─── N posts
posts 1 ─── N comments
profiles 1 ─── N resources
conversations 1 ─── N conversation_members
conversations 1 ─── N messages
profiles 1 ─── N notifications
profiles 1 ─── N reports (reporter)
```

### Schema design principles

-   Use UUID primary keys for externally referenced records.
-   Use `timestamptz` for timestamps and store UTC.
-   Add `created_at` and `updated_at` where applicable.
-   Add foreign keys and appropriate delete behavior.
-   Add unique constraints for memberships, reactions, and other
    relationship tables.
-   Use check constraints for enumerated states where practical.
-   Index foreign keys and common filter/sort columns.
-   Use soft deletion only where product or moderation requirements
    justify it.
-   Do not duplicate sensitive auth data in public profile fields.

### Example SQL sketch

This is illustrative and must be adapted into migrations with RLS
policies and grants before deployment.

``` sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  avatar_path text,
  bio text check (char_length(bio) <= 500),
  university_id uuid,
  program text,
  branch text,
  study_year smallint check (study_year between 1 and 8),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  state text,
  country text not null default 'India',
  website_url text,
  created_at timestamptz not null default now(),
  unique (name, city, state, country)
);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  visibility text not null default 'public'
    check (visibility in ('public', 'private')),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member'
    check (role in ('member', 'moderator', 'owner')),
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id),
  community_id uuid references public.communities(id) on delete set null,
  post_type text not null default 'discussion'
    check (post_type in ('discussion', 'question', 'opportunity', 'experience', 'resource')),
  title text check (title is null or char_length(title) <= 180),
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index posts_created_at_idx on public.posts (created_at desc);
create index posts_community_created_idx on public.posts (community_id, created_at desc);
create index posts_author_created_idx on public.posts (author_id, created_at desc);
```

The sketch intentionally omits the full production schema. Add comments,
reactions, resources, conversations, messages, notifications, reports,
audit logs, constraints, triggers, and policies through migrations.

------------------------------------------------------------------------

## 14. Database and Storage Design

### Database

-   Use PostgreSQL foreign keys and constraints for integrity.
-   Use indexes for community feeds, resource filters, message
    pagination, and report queues.
-   Use cursor pagination for large feeds and message histories.
-   Use database functions only for operations that benefit from
    transactional execution.
-   Avoid exposing unrestricted database views.
-   Review every table for RLS enablement and policies.

### Storage buckets

Suggested buckets:

  Bucket                 Visibility                         Content
  ---------------------- ---------------------------------- -------------------
  `avatars`              Public or controlled public read   Profile images
  `community-media`      Private or policy-controlled       Community images
  `academic-resources`   Private                            Notes, PYQs, PDFs
  `post-attachments`     Private                            Post attachments

For private files, authorize access before issuing a signed URL. Do not
use guessable public paths for sensitive content.

### Upload controls

-   Define maximum upload size.
-   Allow only required file types.
-   Verify actual file content where possible; do not trust filename
    extensions alone.
-   Generate storage names on the server.
-   Rate-limit uploads.
-   Apply malware scanning before making files broadly available.
-   Keep original uploader and provenance metadata.
-   Provide a takedown/report process.

------------------------------------------------------------------------

## 15. Authentication and Authorization

### Authentication

Use Supabase Auth for identity management.

Recommended flows:

-   Email/password.
-   Email verification.
-   Password reset.
-   Optional Google OAuth after provider setup.
-   Session refresh and sign-out.

### Authorization

Use a combination of:

1.  Supabase Auth identity.
2.  PostgreSQL RLS.
3.  Storage policies.
4.  Server-side checks in Edge Functions.
5.  Role checks based on trusted database records.

Never accept a user ID or role supplied by the browser as proof of
authorization.

### RLS policy checklist

For every table, document:

-   Who can select rows?
-   Who can insert rows?
-   Who can update rows?
-   Who can delete rows?
-   Can moderators access this row?
-   Is access scoped to a community or conversation?
-   Can blocked users interact?
-   Are private profiles or conversations protected?

**Critical:** Enable RLS on all exposed tables. Test policies with at
least two ordinary accounts, a moderator account, and an unauthenticated
session. A working happy-path demo is not evidence that access controls
are secure.

------------------------------------------------------------------------

## 16. Realtime Messaging

### Recommended design

-   Persist conversations and messages in PostgreSQL.
-   Store conversation membership separately.
-   Subscribe only to conversations the current user is authorized to
    access.
-   Use realtime updates for delivery, not as the permanent message
    store.
-   Paginate older messages.
-   Track unread state with a deliberate design rather than loading all
    messages.
-   Enforce block, membership, and moderation rules before sending.

### Message lifecycle

``` text
User submits message
        |
        v
Validate input and session
        |
        v
Check conversation membership
        |
        v
Apply block / rate-limit checks
        |
        v
Persist message in database
        |
        v
Realtime event reaches authorized subscribers
        |
        v
Client updates conversation UI
```

### Abuse prevention

-   Limit message length.
-   Apply per-user send rate limits.
-   Add block and report functionality.
-   Avoid exposing private message bodies in logs.
-   Consider spam detection and account restrictions as the platform
    grows.

------------------------------------------------------------------------

## 17. Academic Resource Library

### Resource discovery filters

-   University.
-   Program or branch.
-   Semester.
-   Subject.
-   Resource category.
-   Academic year.
-   Review status.

### Resource detail page

Show:

-   Resource title and metadata.
-   Uploader and upload date.
-   File type and size.
-   Moderation/review label.
-   Download action.
-   Report action.
-   Optional usefulness rating.

### Accuracy and provenance

Do not label resources as official unless the source and authorization
support that claim. Use labels such as:

-   `Community uploaded`
-   `Moderator reviewed`
-   `Official source link` (only when genuinely sourced)

### Copyright and academic integrity

-   Users must only upload material they own or are authorized to share.
-   Provide a copyright complaint and takedown process.
-   Do not facilitate distribution of leaked examination papers.
-   Do not encourage cheating, impersonation, or submission of
    plagiarized work.
-   Provide clear academic integrity rules.

------------------------------------------------------------------------

## 18. AI Features and Guardrails

AI is an enhancement, not the core source of truth.

### MVP AI use cases

1.  **Resource assistant:** Search approved resource metadata and help
    students find relevant documents.
2.  **Document summary:** Summarize a permitted uploaded document after
    text extraction and access checks.
3.  **Question refinement:** Help a student make a question clearer
    before publishing.
4.  **Topic discovery:** Suggest relevant communities or resource
    categories.

### AI request flow

``` text
Authenticated student
        |
        v
Trusted server function
        |
        +--> Verify session and permissions
        |
        +--> Apply request limits
        |
        +--> Retrieve only authorized context
        |
        +--> Redact unnecessary personal data
        |
        v
Gemini API (server-side secret)
        |
        v
Validate and label generated response
        |
        v
Return response with source references where available
```

### AI safety requirements

-   Keep the Gemini API key on the server.
-   Do not send private messages or private profile data to the model by
    default.
-   Only retrieve documents the user is authorized to access.
-   Treat uploaded documents as untrusted input; ignore instructions
    embedded in documents.
-   Label AI-generated summaries and suggestions.
-   Show the source resource or document used when possible.
-   Do not present generated answers as official university policy.
-   Tell users to verify exam, placement, legal, financial, or other
    consequential information.
-   Rate-limit requests and monitor cost.
-   Handle provider outages and quota errors gracefully.
-   Do not store raw prompts containing sensitive personal data unless
    necessary and disclosed.

------------------------------------------------------------------------

## 19. Security and Privacy

Security must be implemented before public launch, not added after the
demo.

### Minimum security checklist

-   [ ] HTTPS in production.
-   [ ] No secrets committed to Git.
-   [ ] No service-role key in frontend environment variables.
-   [ ] RLS enabled and tested on exposed tables.
-   [ ] Storage policies restrict private resources.
-   [ ] Server-side validation for privileged operations.
-   [ ] Strong input validation and output encoding.
-   [ ] File size/type restrictions and malware scanning plan.
-   [ ] Rate limiting on sign-in, messaging, uploads, reports, and AI
    requests.
-   [ ] Safe error messages that do not expose internal details.
-   [ ] Audit trail for administrative and moderation actions.
-   [ ] Account deletion and data export process defined.
-   [ ] Privacy policy and terms of use published.
-   [ ] Dependency and secret scanning enabled in CI.
-   [ ] Backup and recovery approach documented.

### Personal data principles

-   Collect only information needed for the platform.
-   Make profile visibility understandable.
-   Do not reveal private email addresses by default.
-   Provide account deletion and support contact information.
-   Define data retention periods for messages, reports, and logs.
-   Restrict administrator access and log sensitive administrative
    actions.
-   Review applicable Indian data protection requirements before public
    launch.

### Threats to consider

  -----------------------------------------------------------------------
  Threat                              Mitigation
  ----------------------------------- -----------------------------------
  Unauthorized access to private      Membership checks and RLS
  chats                               

  User impersonation                  Email verification and clear
                                      verification status

  Malicious file uploads              Type/size validation, scanning,
                                      private storage

  Spam and harassment                 Rate limits, block/report,
                                      moderation

  Prompt injection in uploaded        Treat document text as untrusted
  documents                           data

  API key exposure                    Server-side secret storage

  Scraping of student profiles        Minimal public data, rate limits,
                                      visibility controls

  Privilege escalation                Trusted role records and
                                      server-side authorization
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 20. Moderation and Trust

A student community needs clear rules and operational moderation.

### Community rules

-   Be respectful; harassment and hate speech are not allowed.
-   Do not share another person's private information.
-   Do not impersonate students, faculty, or university staff.
-   Do not post scams, spam, or misleading opportunities.
-   Do not upload leaked papers or unauthorized copyrighted content.
-   Clearly identify personal opinions and unverified experiences.
-   Do not use the platform to threaten, bully, or target individuals.

### Verification model

Use explicit status labels:

-   `Unverified`
-   `Email verified`
-   `Student status pending`
-   `Student verified`

An email domain match alone may not be sufficient proof of current
student status. Verification methods should be selected per institution
and documented. Do not imply that CampusConnect is officially affiliated
with a university without authorization.

### Moderation workflow

`Open → Under review → Action taken / Dismissed`

Every moderator action should record:

-   Moderator ID.
-   Target type and target ID.
-   Action.
-   Reason.
-   Timestamp.
-   Optional internal notes.

Keep internal moderation notes private and restrict access.

------------------------------------------------------------------------

## 21. User Interface and Accessibility

### Design direction

-   Modern, calm, student-friendly visual language.
-   Dark navy/charcoal foundation with restrained blue or purple
    accents.
-   Clear information hierarchy.
-   Responsive layouts.
-   Consistent typography, spacing, and component behavior.
-   Avoid excessive gradients, animation, and decorative clutter.

### Main navigation

1.  Home
2.  Explore
3.  Communities
4.  Messages
5.  Resources
6.  Ask a Senior
7.  Opportunities
8.  Profile

### Core screens

-   Landing page.
-   Sign up / sign in / password reset.
-   Onboarding.
-   Home feed.
-   Explore students and universities.
-   University page.
-   Community page.
-   Post detail and question thread.
-   Resource library and resource detail.
-   Upload resource.
-   Direct and group messaging.
-   Ask a Senior.
-   Notifications.
-   User profile.
-   Settings and privacy.
-   Report content.
-   Moderator dashboard.

### Accessibility

Target WCAG 2.2 AA where practical:

-   Semantic HTML.
-   Keyboard-operable controls.
-   Visible focus states.
-   Accessible form labels and errors.
-   Sufficient color contrast.
-   Alternative text for meaningful images.
-   Do not communicate status through color alone.
-   Respect reduced-motion preferences.
-   Support screen-reader-friendly dialogs and menus.

------------------------------------------------------------------------

## 22. Environment Variables

Create a local `.env` file from `.env.example`. Never commit `.env`.

Example `.env.example`:

``` bash
# Supabase project URL
VITE_SUPABASE_URL=

# Supabase publishable/anon key; safe for browser use only with correct RLS
VITE_SUPABASE_ANON_KEY=

# Used only by trusted server functions; never expose to the browser
GEMINI_API_KEY=

# Optional application configuration
VITE_APP_NAME=CampusConnect
VITE_APP_URL=http://localhost:5173
```

**Important:** Vite exposes variables prefixed with `VITE_` to browser
bundles. Never prefix private secrets with `VITE_`. Configure
`GEMINI_API_KEY` as a secret in Supabase Edge Functions or the chosen
server environment.

Depending on the Supabase SDK version, the public key may be called a
publishable key rather than an anon key. Use the key type recommended by
the current Supabase project settings.

------------------------------------------------------------------------

## 23. Local Development Setup

### Prerequisites

-   Node.js LTS.
-   npm (or the package manager selected by the repository).
-   Git.
-   A Supabase project, or local Supabase CLI setup.
-   Gemini API key only if AI features are enabled.

### Installation

``` bash
# 1. Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd campusconnect

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env

# 4. Add Supabase project URL and public client key to .env

# 5. Start development server
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Recommended package scripts

Ensure `package.json` provides scripts equivalent to:

``` json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

These are recommended scripts, not a claim that they already exist in
the repository. Align them with the actual tool configuration.

------------------------------------------------------------------------

## 24. Database Setup and Migrations

Use the Supabase CLI and checked-in migrations for repeatable
environments.

Typical workflow:

``` bash
# Install / authenticate Supabase CLI using its official instructions

# Link the local project to the Supabase project
supabase link --project-ref <PROJECT_REF>

# Apply migrations to the linked project
supabase db push

# Generate TypeScript database types
supabase gen types typescript --linked > src/types/database.ts
```

For local development, use the Supabase CLI local stack if configured:

``` bash
supabase start
supabase db reset
```

Before applying migrations to production:

1.  Review the SQL diff.
2.  Test against a staging database.
3.  Verify RLS and storage policies.
4.  Back up production data where appropriate.
5.  Apply migrations through a controlled deployment process.

Never edit production schema manually without recording the
corresponding migration.

------------------------------------------------------------------------

## 25. Development Workflow

### Branching

Use short-lived branches:

-   `main` --- production-ready code.
-   `develop` --- optional integration branch.
-   `feature/<name>` --- feature work.
-   `fix/<name>` --- bug fixes.
-   `docs/<name>` --- documentation.

### Commit conventions

Use clear, scoped messages:

``` text
feat(auth): add email verification flow
feat(resources): add categorized resource upload
fix(chat): enforce conversation membership
docs(readme): document local setup
test(rls): cover private conversation access
```

### Pull request checklist

-   [ ] Requirement and acceptance criteria are clear.
-   [ ] UI handles loading, empty, success, and error states.
-   [ ] Input validation exists on the trusted boundary.
-   [ ] Authorization and RLS policies are reviewed.
-   [ ] No secrets or personal data are logged.
-   [ ] Unit/integration/E2E tests are updated.
-   [ ] Accessibility and responsive behavior are checked.
-   [ ] Documentation is updated.

------------------------------------------------------------------------

## 26. Testing Strategy

### Unit tests

Test:

-   Form schemas and validation.
-   Utility functions.
-   Role and permission helpers.
-   Resource metadata validation.
-   Feed filtering and sorting.
-   AI response parsing and error handling.

### Integration tests

Test:

-   Authenticated profile creation.
-   Community membership.
-   Post creation and comments.
-   Resource metadata and upload authorization.
-   Conversation membership and message insertion.
-   Notification creation.
-   Report submission and moderator actions.

### End-to-end tests

At minimum, automate these flows:

1.  Register and complete onboarding.
2.  Join a university community.
3.  Create a post and comment.
4.  Ask a question and mark an answer helpful.
5.  Upload a resource and find it through search.
6.  Send a message between two test accounts.
7.  Confirm a third account cannot access a private conversation.
8.  Report content and process it as a moderator.
9.  Confirm a normal user cannot access moderator routes or actions.

### Security testing

-   Test RLS with multiple user identities.
-   Test unauthenticated requests.
-   Test forged user IDs and role fields.
-   Test private storage access.
-   Test oversized and invalid uploads.
-   Test rate-limit behavior.
-   Test AI prompt injection and unauthorized document retrieval.

A test that only checks the visual presence of a button is not a
substitute for testing the action behind it.

------------------------------------------------------------------------

## 27. CI/CD and Deployment

### Environments

Maintain separate environments where possible:

-   Local development.
-   Staging / preview.
-   Production.

Use separate Supabase projects for staging and production when feasible.

### CI pipeline

On every pull request:

1.  Install dependencies with lockfile enforcement.
2.  Run lint.
3.  Run type checks.
4.  Run unit tests.
5.  Build the production bundle.
6.  Run selected integration or E2E tests.
7.  Scan dependencies and secrets.

### Deployment checklist

-   [ ] Production environment variables configured.
-   [ ] Database migrations applied.
-   [ ] RLS policies reviewed and tested.
-   [ ] Storage policies reviewed.
-   [ ] Edge Function secrets configured.
-   [ ] Authentication redirect URLs configured.
-   [ ] CORS and allowed origins reviewed.
-   [ ] Domain and HTTPS configured.
-   [ ] Privacy Policy and Terms published.
-   [ ] Admin account secured.
-   [ ] Backup and recovery plan documented.
-   [ ] Error monitoring enabled.
-   [ ] Demo/test accounts removed or disabled as appropriate.

Do not use production student data for classroom demos. Use synthetic
demo accounts and fictional records.

------------------------------------------------------------------------

## 28. Observability and Operations

### Monitor

-   Frontend exceptions.
-   Failed authentication.
-   Database errors and slow queries.
-   Realtime connection failures.
-   Storage upload/download failures.
-   Edge Function failures and latency.
-   AI request latency, failures, and token/cost usage.
-   Report queue volume and resolution time.

### Logging principles

-   Use structured logs with request identifiers.
-   Do not log passwords, access tokens, private message content, or
    unnecessary personal information.
-   Restrict access to operational logs.
-   Define retention periods.
-   Make errors actionable without exposing internal implementation
    details to users.

### Operational runbooks

Document how to:

-   Rotate exposed API keys.
-   Disable a compromised account.
-   Remove a malicious resource.
-   Respond to spam or harassment spikes.
-   Recover from a failed migration.
-   Restore data from backups.
-   Disable AI functionality during provider outages.

------------------------------------------------------------------------

## 29. Acceptance Criteria

The MVP is ready for demonstration only when the following are true.

### Account and identity

-   [ ] A new user can register and verify their email.
-   [ ] A returning user can sign in and sign out.
-   [ ] A user can complete and edit their own profile.
-   [ ] Users cannot edit another user's profile.

### Communities and feed

-   [ ] A user can discover and join a community.
-   [ ] A member can create a post in an allowed community.
-   [ ] Users can comment and react.
-   [ ] A user cannot create content in a private community they have
    not joined.
-   [ ] Feed pagination works.

### Resources

-   [ ] An authorized user can upload an allowed file.
-   [ ] Resource metadata is saved correctly.
-   [ ] Users can filter and search resources.
-   [ ] Authorized users can download approved resources.
-   [ ] Unauthorized users cannot retrieve private storage objects.
-   [ ] Users can report a resource.

### Messaging

-   [ ] Two authorized users can exchange messages.
-   [ ] New messages appear without manual page refresh.
-   [ ] A non-member cannot read or send messages in a private
    conversation.
-   [ ] A user can report or block another user.

### Moderation and security

-   [ ] Users can submit reports.
-   [ ] Moderators can review reports within their scope.
-   [ ] Moderator actions are auditable.
-   [ ] Ordinary users cannot perform moderator actions.
-   [ ] RLS and storage policies have automated or documented tests.

### Product quality

-   [ ] Main workflows work on mobile and desktop.
-   [ ] Forms have validation and clear error messages.
-   [ ] Loading and empty states are present.
-   [ ] No secrets are exposed in the frontend bundle.
-   [ ] The production build succeeds.

------------------------------------------------------------------------

## 30. Demo and Seed Data

For a reliable presentation, seed the application with fictional data
only.

Suggested demo setup:

-   3 fictional universities.
-   6 fictional student profiles across different study years.
-   2 senior/mentor profiles.
-   4 communities.
-   8 feed posts.
-   5 questions with answers.
-   8 sample academic resources using documents you created or have
    permission to share.
-   2 group conversations and 2 direct conversations.
-   3 sample opportunities.
-   3 moderation reports.

### Suggested live demonstration (5--7 minutes)

  Time         Demonstration
  ------------ ----------------------------------------------------------
  0:00--0:40   Explain the student problem and CampusConnect vision
  0:40--1:20   Register/sign in and show student profile
  1:20--2:10   Explore universities and join a community
  2:10--3:00   Create a post and ask a senior-style question
  3:00--4:00   Upload and search a PYQ/resource
  4:00--5:00   Demonstrate realtime chat with a second account
  5:00--5:40   Show AI resource assistance, if enabled
  5:40--6:30   Show moderation, security boundaries, and future roadmap

Keep a pre-created demo account and backup recording available in case
campus Wi-Fi or a third-party service fails. Do not fake a live
integration.

------------------------------------------------------------------------

## 31. Roadmap

### Phase 0 --- Foundation

-   Confirm product requirements.
-   Create repository and design system.
-   Configure Supabase.
-   Establish schema, migrations, and RLS.
-   Build authentication and onboarding.

### Phase 1 --- Core community

-   Student profiles.
-   University directory.
-   Communities and membership.
-   Feed, posts, comments, and reactions.
-   Questions and answers.

### Phase 2 --- Resources and communication

-   Academic resource library.
-   Secure upload/download.
-   Direct and group messaging.
-   Notifications.
-   Blocking and reporting.

### Phase 3 --- Trust and AI

-   Moderator dashboard.
-   Verification workflow.
-   AI resource search and summarization.
-   Rate limits and usage monitoring.
-   Security and accessibility review.

### Phase 4 --- Pilot

-   Invite a small group of students.
-   Start with a limited number of universities.
-   Collect feedback.
-   Measure activation and useful interactions.
-   Fix moderation and resource quality issues.
-   Expand only when operations can support growth.

------------------------------------------------------------------------

## 32. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                    Impact                  Mitigation
  ----------------------- ----------------------- -----------------------
  Empty communities at    Low engagement          Start with a small
  launch                                          number of active pilot
                                                  communities

  Fake student profiles   Loss of trust           Clear verification
                                                  states and reporting

  Incorrect senior advice Students may rely on    Show context, dates,
                          misinformation          and personal-experience
                                                  labels

  Copyright-infringing    Legal and takedown risk Upload rules,
  uploads                                         reporting, takedown
                                                  workflow

  Harassment or spam      User safety and         Block/report, rate
                          retention               limits, moderation

  Leaked examination      Academic integrity      Prohibit leaked papers
  material                issues                  and remove reported
                                                  content

  AI hallucinations       Misleading guidance     Source links,
                                                  disclaimers, human
                                                  verification

  File malware            User device risk        File scanning and
                                                  restricted downloads

  Database                Data exposure           RLS review, automated
  misconfiguration                                authorization tests

  High realtime/AI costs  Operational cost        Usage limits, quotas,
                                                  monitoring, pagination
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 33. Contribution Guidelines

Contributions should be focused, tested, and documented.

1.  Open an issue describing the problem or feature.
2.  Agree on scope before large changes.
3.  Create a feature or fix branch.
4.  Follow the established TypeScript and component conventions.
5.  Add or update tests.
6.  Update database migrations when schema changes.
7.  Include RLS and storage policy changes where needed.
8.  Open a pull request with screenshots for UI changes.
9.  Do not commit credentials, student personal data, or copyrighted
    material.

------------------------------------------------------------------------

## 34. License and Legal Notes

Choose and add a license before accepting external contributions or
distributing the code.

If this project is intended for a public launch:

-   Publish Terms of Use and a Privacy Policy.
-   Review applicable Indian data protection and intermediary-related
    requirements with qualified counsel.
-   Provide a contact for privacy, copyright, and safety complaints.
-   Establish a process for handling removal requests.
-   Do not claim official affiliation with any university without
    written authorization.
-   Obtain permission before using university logos, branding, or
    protected materials.
-   Do not collect or publish student information without an appropriate
    lawful basis and clear notice.

This README is engineering documentation, not legal advice or a
certification of compliance.

------------------------------------------------------------------------

## 35. Product Principles

1.  **Students first:** Optimize for real student needs, not feature
    count.
2.  **Trust over vanity:** Accurate identity and content context matter
    more than follower counts.
3.  **Useful structure:** Discussions and resources should remain
    searchable.
4.  **Privacy by default:** Do not expose private information
    unnecessarily.
5.  **Safe communication:** Blocking, reporting, and moderation are core
    features.
6.  **AI with accountability:** AI should assist discovery and
    understanding, not impersonate authority.
7.  **Build end to end:** A smaller reliable product is better than a
    large collection of non-functional screens.
8.  **Expand deliberately:** Prove value with a focused university pilot
    before scaling.

------------------------------------------------------------------------

## Quick Start Summary

``` bash
git clone <YOUR_REPOSITORY_URL>
cd campusconnect
npm install
cp .env.example .env
# Configure Supabase public project URL and public client key
npm run dev
```

Before calling the MVP complete, verify authentication, onboarding,
communities, posts, resources, realtime messaging, moderation, RLS,
storage policies, and mobile responsiveness.

------------------------------------------------------------------------

**CampusConnect --- Your University. Your People. Your Community.**
