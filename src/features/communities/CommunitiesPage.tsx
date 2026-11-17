import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../lib/store';
import { Users2, Shield, Search, Plus, Building2, Check, ArrowRight } from 'lucide-react';

export const CommunitiesPage: React.FC = () => {
  const { communities, joinCommunity, leaveCommunity, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCommunities = communities.filter(c => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Communities' },
    { id: 'branch', label: 'Department / Branch' },
    { id: 'interest', label: 'Hackathons & Careers' },
    { id: 'clubs', label: 'Campus Clubs' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Student Spaces
          </span>
          <span className="text-xs text-gray-400">• Persistent Discussions</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Explore Student Communities
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
          Join your university department, placement prep groups, and national hacker circles. No scattered WhatsApp group limits.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommunities.map((comm) => (
          <div
            key={comm.id}
            className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {comm.category}
                </span>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Users2 className="w-3.5 h-3.5" />
                  {comm.member_count} students
                </span>
              </div>

              <div>
                <Link
                  to={`/communities/${comm.slug}`}
                  className="text-base font-bold text-white group-hover:text-blue-400 transition-colors inline-block"
                >
                  {comm.name}
                </Link>
                {comm.university && (
                  <p className="text-xs text-blue-400 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    {comm.university.name}
                  </p>
                )}
                <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                  {comm.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
              <Link
                to={`/communities/${comm.slug}`}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>View Community</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => comm.is_member ? leaveCommunity(comm.id) : joinCommunity(comm.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  comm.is_member
                    ? 'bg-gray-800 text-gray-300 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-900 border border-transparent'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                }`}
              >
                {comm.is_member ? 'Joined' : 'Join Community'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
