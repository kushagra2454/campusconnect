import { createHashRouter } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { FeedPage } from '../features/feed/FeedPage';
import { ExplorePage } from '../features/explore/ExplorePage';
import { CommunitiesPage } from '../features/communities/CommunitiesPage';
import { CommunityDetailPage } from '../features/communities/CommunityDetailPage';
import { AskSeniorPage } from '../features/questions/AskSeniorPage';
import { ResourcesPage } from '../features/resources/ResourcesPage';
import { OpportunitiesPage } from '../features/opportunities/OpportunitiesPage';
import { MessagingPage } from '../features/messaging/MessagingPage';
import { ProfilePage } from '../features/profiles/ProfilePage';
import { ModerationPage } from '../features/moderation/ModerationPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'communities', element: <CommunitiesPage /> },
      { path: 'communities/:slug', element: <CommunityDetailPage /> },
      { path: 'questions', element: <AskSeniorPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'opportunities', element: <OpportunitiesPage /> },
      { path: 'messages', element: <MessagingPage /> },
      { path: 'profile/:id', element: <ProfilePage /> },
      { path: 'moderation', element: <ModerationPage /> },
    ],
  },
]);
