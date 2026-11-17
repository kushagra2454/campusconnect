-- ====================================================================
-- CampusConnect Demo Seed Data
-- Fictional dataset for live demo and evaluation
-- ====================================================================

-- 1. Universities
insert into public.universities (id, name, short_code, city, state, country, website_url, student_count) values
  ('11111111-1111-1111-1111-111111111111', 'Apex Institute of Technology', 'AIT', 'Bengaluru', 'Karnataka', 'India', 'https://apex.edu.example', 14200),
  ('22222222-2222-2222-2222-222222222222', 'National Metro University', 'NMU', 'Delhi NCR', 'Delhi', 'India', 'https://nmu.edu.example', 28500),
  ('33333333-3333-3333-3333-333333333333', 'Horizon Engineering & Research Institute', 'HERI', 'Pune', 'Maharashtra', 'India', 'https://heri.edu.example', 9800)
on conflict do nothing;

-- 2. Profiles (Mock auth user ids)
insert into public.profiles (id, display_name, avatar_path, bio, university_id, program, branch, study_year, verification_status, role, skills, interests, is_mentor, mentor_topics) values
  ('aaaa1111-0000-0000-0000-000000000001', 'Aarav Sharma', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Final Year CS @ AIT | Incoming SDE at CloudScale | Open to mentoring juniors in DSA, System Design & Placements', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Computer Science & Engineering', 4, 'verified', 'student', ARRAY['Data Structures', 'System Design', 'React', 'Go'], ARRAY['Competitive Programming', 'Cloud Architecture', 'Mentorship'], true, ARRAY['Placements 2026', 'Internship Prep', 'Resume Review', 'DSA Roadmap']),
  ('aaaa1111-0000-0000-0000-000000000002', 'Priya Patel', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', '3rd Year ECE @ NMU | Robotics & Embedded Systems enthusiast | Campus Moderator', '22222222-2222-2222-2222-222222222222', 'B.Tech', 'Electronics & Communication', 3, 'verified', 'moderator', ARRAY['Embedded C', 'IoT', 'Python', 'MATLAB'], ARRAY['Robotics Club', 'Hardware Hackathons', 'Open Source'], true, ARRAY['ECE Core Placements', 'Hardware Projects', 'Gate Preparation']),
  ('aaaa1111-0000-0000-0000-000000000003', 'Rohan Verma', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '1st Year Freshman @ AIT | Exploring Web Dev & AI | Trying to survive Sem 1 Engineering Maths', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Computer Science & Engineering', 1, 'verified', 'student', ARRAY['C++', 'JavaScript', 'HTML/CSS'], ARRAY['Hackathons', 'Student Startups', 'Campus Life'], false, '{}'),
  ('aaaa1111-0000-0000-0000-000000000004', 'Sneha Iyer', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', '2nd Year IT @ HERI | UI/UX Designer & Frontend Dev | Notes contributor', '33333333-3333-3333-3333-333333333333', 'B.Tech', 'Information Technology', 2, 'verified', 'student', ARRAY['Figma', 'TailwindCSS', 'TypeScript', 'Next.js'], ARRAY['Product Design', 'Open Source Notes', 'Design Systems'], false, '{}'),
  ('aaaa1111-0000-0000-0000-000000000005', 'Vikram Sen', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Postgrad Research Scholar @ HERI | Platform Administrator & Academic coordinator', '33333333-3333-3333-3333-333333333333', 'M.Tech', 'Data Science & AI', 2, 'verified', 'admin', ARRAY['Machine Learning', 'PyTorch', 'Database Systems'], ARRAY['Academic Integrity', 'AI Governance', 'Research Publishing'], false, '{}'),
  ('aaaa1111-0000-0000-0000-000000000006', 'Ananya Deshmukh', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '3rd Year Mechanical @ NMU | Formula Student Lead | CAD Designer', '22222222-2222-2222-2222-222222222222', 'B.Tech', 'Mechanical Engineering', 3, 'verified', 'student', ARRAY['SolidWorks', 'ANSYS', 'Automotive Systems'], ARRAY['Formula Student', 'Aerodynamics', 'EV Tech'], false, '{}')
on conflict do nothing;

-- 3. Communities
insert into public.communities (id, university_id, name, slug, description, category, rules, visibility, created_by, member_count) values
  ('c1111111-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'AIT CSE Hub', 'ait-cse-hub', 'Official student space for CSE students at Apex Institute of Technology. Share course tips, lab assignments, and project ideas.', 'branch', '1. Strictly academic and professional discussions. 2. No sharing leaked exam questions. 3. Be respectful to juniors and seniors.', 'public', 'aaaa1111-0000-0000-0000-000000000001', 540),
  ('c1111111-0000-0000-0000-000000000002', null, 'Campus Hackers & Builders', 'campus-hackers', 'Cross-university community for students building side projects, competing in national hackathons, and finding teammates.', 'interest', '1. Post genuine projects and hackathon team requests. 2. No spam or commercial promotions.', 'public', 'aaaa1111-0000-0000-0000-000000000004', 1280),
  ('c1111111-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'NMU Electronics & Robotics', 'nmu-robotics', 'Hardware hackers, embedded devs, and robotics enthusiasts at NMU.', 'clubs', '1. Keep discussions focused on projects and equipment. 2. Safety first in labs.', 'public', 'aaaa1111-0000-0000-0000-000000000002', 320),
  ('c1111111-0000-0000-0000-000000000004', null, 'Placements & Internships 2026', 'placements-internships-2026', 'All-India student placement discussions, interview experiences, OA question patterns, and CTC benchmarks.', 'interest', '1. Only verified interview experiences. 2. Maintain confidentiality where NDAs apply.', 'public', 'aaaa1111-0000-0000-0000-000000000001', 2150)
on conflict do nothing;

-- 4. Community Memberships
insert into public.community_members (community_id, user_id, role) values
  ('c1111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000001', 'owner'),
  ('c1111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000003', 'member'),
  ('c1111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000003', 'member'),
  ('c1111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000004', 'owner'),
  ('c1111111-0000-0000-0000-000000000003', 'aaaa1111-0000-0000-0000-000000000002', 'owner'),
  ('c1111111-0000-0000-0000-000000000004', 'aaaa1111-0000-0000-0000-000000000001', 'moderator'),
  ('c1111111-0000-0000-0000-000000000004', 'aaaa1111-0000-0000-0000-000000000002', 'member')
on conflict do nothing;

-- 5. Academic Resources (8 authentic sample resources)
insert into public.resources (id, title, description, university_id, program, branch, semester, subject, resource_type, academic_year, file_url, file_name, file_size_bytes, file_mime_type, uploader_id, moderation_status, verification_badge, downloads_count) values
  ('r1111111-0000-0000-0000-000000000001', 'Data Structures & Algorithms - End-Sem 2025 Solved PYQ', 'Complete solution paper for 3rd semester CSE/IT DSA exam covering Trees, Graphs, Dynamic Programming, and Amortized Analysis.', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Computer Science & Engineering', 3, 'Data Structures & Algorithms', 'pyq', '2024-2025', '#', 'AIT_DSA_EndSem_2025_Solved.pdf', 3840000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000001', 'approved', 'Moderator reviewed', 482),
  ('r1111111-0000-0000-0000-000000000002', 'Operating Systems Complete Lecture Notes (Process Mgmt, Deadlocks, Virtual Memory)', 'Comprehensive handwritten class notes with clear diagrammatic representations of scheduling algorithms and memory paging.', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Computer Science & Engineering', 4, 'Operating Systems', 'notes', '2024-2025', '#', 'OS_Complete_Notes_Unit1_5.pdf', 8420000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000004', 'approved', 'Community uploaded', 629),
  ('r1111111-0000-0000-0000-000000000003', 'Database Management Systems Lab Manual & Practice Queries', 'Includes SQL exercises, normalization case studies, and trigger definitions on PostgreSQL.', '33333333-3333-3333-3333-333333333333', 'B.Tech', 'Information Technology', 4, 'DBMS', 'lab_manual', '2024-2025', '#', 'HERI_DBMS_Lab_Manual_v2.pdf', 2150000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000005', 'approved', 'Official source link', 314),
  ('r1111111-0000-0000-0000-000000000004', 'Engineering Mathematics I - Calculus & Linear Algebra PYQs (2021-2024)', 'Past 4 years mid-sem and end-sem question papers with step-by-step marking scheme.', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Common First Year', 1, 'Engineering Mathematics I', 'pyq', '2023-2024', '#', 'EnggMaths_1_PYQ_Compendium.pdf', 5230000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000001', 'approved', 'Moderator reviewed', 920),
  ('r1111111-0000-0000-0000-000000000005', 'Digital Signal Processing Formula Sheet & Quick Revision Notes', 'Concise 12-page cheat-sheet for DFT, FFT, Butterworth & Chebyshev filter design.', '22222222-2222-2222-2222-222222222222', 'B.Tech', 'Electronics & Communication', 5, 'Digital Signal Processing', 'notes', '2024-2025', '#', 'DSP_Formula_Revision_CheatSheet.pdf', 1420000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000002', 'approved', 'Community uploaded', 187),
  ('r1111111-0000-0000-0000-000000000006', 'Computer Networks Socket Programming Assignment Solutions', 'TCP/UDP client-server implementation in Python and C with Wireshark packet capture analysis.', '33333333-3333-3333-3333-333333333333', 'B.Tech', 'Computer Science & Engineering', 5, 'Computer Networks', 'assignment', '2024-2025', '#', 'CN_Socket_Assignment_Code_Report.pdf', 2900000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000004', 'approved', 'Community uploaded', 412),
  ('r1111111-0000-0000-0000-000000000007', 'Microprocessors & Microcontrollers 8086/8051 Lab Experiments', 'Assembly language codes and proteus simulation screenshots for laboratory evaluation.', '22222222-2222-2222-2222-222222222222', 'B.Tech', 'Electronics & Communication', 4, 'Microprocessors & Microcontrollers', 'lab_manual', '2023-2024', '#', 'MPMC_8086_Lab_Experiments.pdf', 3400000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000002', 'approved', 'Community uploaded', 278),
  ('r1111111-0000-0000-0000-000000000008', 'Automata Theory & Computability (FLAT) Official Syllabus & Recommended Books', 'Detailed course roadmap, textbook chapters mapping, and Turing Machine reduction proofs.', '11111111-1111-1111-1111-111111111111', 'B.Tech', 'Computer Science & Engineering', 5, 'Theory of Computation', 'syllabus', '2024-2025', '#', 'FLAT_Syllabus_Breakdown_2025.pdf', 980000, 'application/pdf', 'aaaa1111-0000-0000-0000-000000000005', 'approved', 'Official source link', 145)
on conflict do nothing;

-- 6. Sample Posts & Q&A
insert into public.posts (id, author_id, community_id, post_type, title, body, tags, likes_count, comments_count) values
  ('p1111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000003', 'c1111111-0000-0000-0000-000000000001', 'question', 'How to tackle Engineering Mathematics I for first year end-sems?', 'Hey seniors! Mid-sem results just came out and calculus was quite brutal for most of us in Section B. Can anyone guide on high-weightage topics and which book/video lectures are the most effective?', ARRAY['FirstYear', 'EnggMaths', 'ExamPrep'], 24, 3),
  ('p1111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000001', 'c1111111-0000-0000-0000-000000000004', 'experience', 'How I cracked the CloudScale SDE Internship: Round by Round Breakdown', 'Sharing my complete experience from on-campus placements. \n\n1. Online Assessment: 3 DSA problems (1 Sliding window, 1 DP on Trees, 1 Graph BFS).\n2. Technical Round 1: Live coding on Binary Tree LCA and LRU Cache design.\n3. Technical Round 2: Deep dive into my distributed caching project and OS internals (Virtual memory & Mutex vs Semaphore).\n4. HR/Managerial: Project trade-offs and culture fit.\n\nTip: Focus on fundamentals rather than memorizing Leetcode solutions!', ARRAY['Placements', 'InterviewExperience', 'SDE', 'Internship'], 112, 14),
  ('p1111111-0000-0000-0000-000000000003', 'aaaa1111-0000-0000-0000-000000000004', 'c1111111-0000-0000-0000-000000000002', 'opportunity', 'Looking for 1 Backend Dev (FastAPI / Node) for Smart India Hackathon', 'Our team has finalized the problem statement in the Smart Healthcare category. We have 2 frontend devs and 1 ML researcher. Need someone comfortable with REST APIs, authentication, and Docker deployment.', ARRAY['SIH2026', 'HackathonTeammates', 'Backend'], 18, 5)
on conflict do nothing;

-- 7. Sample Comments
insert into public.comments (id, post_id, author_id, body, is_helpful, upvotes_count) values
  ('cm111111-0000-0000-0000-000000000001', 'p1111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000001', 'Senior advice here: 1) Focus on Eigenvalues & Cayley-Hamilton theorem (guaranteed 14 marks question). 2) Practice Multiple Integrals and Vector Calculus divergence theorem. Check the 4-year PYQ compendium I uploaded in the Resources tab—almost 70% patterns repeat!', true, 19),
  ('cm111111-0000-0000-0000-000000000002', 'p1111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000002', 'Also check Prof. Gajendra Purohit playlist on YouTube for rapid revisions before exam morning. It helped me save my GPA back in 1st year.', false, 8)
on conflict do nothing;

-- 8. Opportunities
insert into public.opportunities (id, title, organization, opportunity_type, description, location, is_remote, deadline, apply_url, posted_by) values
  ('op111111-0000-0000-0000-000000000001', 'Summer Research Fellowship in Machine Learning', 'National Institute of Computing Research', 'internship', '10-week summer research internship with stipend for 2nd and 3rd year engineering students. Work on multilingual NLP and Edge AI.', 'Bengaluru / Hybrid', false, '2026-03-31', 'https://nicr.res.example/fellowship', 'aaaa1111-0000-0000-0000-000000000005'),
  ('op111111-0000-0000-0000-000000000002', 'HackIndia 2026: 36-Hour National Collegiate Hackathon', 'India Tech Council & Startup Hub', 'hackathon', 'Compete with 500+ teams across India. ₹5 Lakh prize pool with on-spot interviews for finalists.', 'New Delhi', false, '2026-04-15', 'https://hackindia.example/register', 'aaaa1111-0000-0000-0000-000000000004'),
  ('op111111-0000-0000-0000-000000000003', 'Open Source Contributor Program (Mentored)', 'Kalam Foundation Open Source', 'project', 'Get paired with a senior mentor to make your first meaningful PRs in production Rust and TypeScript repositories.', 'Fully Remote', true, '2026-05-01', 'https://kalam.example/contribute', 'aaaa1111-0000-0000-0000-000000000001')
on conflict do nothing;

-- 9. Sample Conversations & Messages
insert into public.conversations (id, is_group, title, created_by) values
  ('cv111111-0000-0000-0000-000000000001', false, 'Direct: Rohan & Aarav (Mentorship)', 'aaaa1111-0000-0000-0000-000000000003'),
  ('cv111111-0000-0000-0000-000000000002', true, 'AIT Hackathon Core Team', 'aaaa1111-0000-0000-0000-000000000001')
on conflict do nothing;

insert into public.conversation_members (conversation_id, user_id, role) values
  ('cv111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000003', 'member'),
  ('cv111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000001', 'member'),
  ('cv111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000001', 'admin'),
  ('cv111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000004', 'member'),
  ('cv111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000003', 'member')
on conflict do nothing;

insert into public.messages (conversation_id, sender_id, content) values
  ('cv111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000003', 'Hi Aarav bhaiya! Thanks for marking the Maths PYQs. Could you recommend which Leetcode list to start with in 1st year?'),
  ('cv111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000001', 'Hey Rohan! In first year, do not rush into 500 questions. Start with NeetCode 150 and solidify your pointers and arrays in C++ first.'),
  ('cv111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000001', 'Hey team! Let us review the HackIndia prototype tonight at 8 PM.'),
  ('cv111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000004', 'Sounds good, the Figma UI mocks are ready!')
on conflict do nothing;

-- 10. Moderation Reports
insert into public.reports (id, reporter_id, target_type, target_id, reason, context, status) values
  ('rp111111-0000-0000-0000-000000000001', 'aaaa1111-0000-0000-0000-000000000003', 'post', 'p1111111-0000-0000-0000-000000000001', 'spam', 'User claiming to sell leaked exam paper in comment link', 'under_review'),
  ('rp111111-0000-0000-0000-000000000002', 'aaaa1111-0000-0000-0000-000000000002', 'resource', 'r1111111-0000-0000-0000-000000000004', 'copyright', 'Uploader claimed ownership of university-copyrighted slide deck', 'open')
on conflict do nothing;
