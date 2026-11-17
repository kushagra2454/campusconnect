import React, { useState } from 'react';
import { useApp } from '../../lib/store';
import { OpportunityType } from '../../types';
import { 
  Briefcase, Calendar, MapPin, Globe, ExternalLink, 
  Sparkles, Trophy, Award, Code2, Users
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { opportunities, searchQuery, showToast } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = selectedType === 'all' || opp.opportunity_type === selectedType;
    const matchesSearch = !searchQuery ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Opportunities', icon: Sparkles },
    { id: 'internship', label: 'Internships & Fellowships', icon: Briefcase },
    { id: 'hackathon', label: 'Collegiate Hackathons', icon: Trophy },
    { id: 'project', label: 'Open Source & Research', icon: Code2 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Student Opportunities
          </span>
          <span className="text-xs text-gray-400">• Verified Portals</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Internships, Hackathons & Research
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
          Curated opportunities for Indian university students. Form teams with students from different campuses and apply early.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                  opp.opportunity_type === 'internship'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : opp.opportunity_type === 'hackathon'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {opp.opportunity_type}
                </span>

                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Due: {opp.deadline}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs text-blue-400 font-semibold mt-0.5">
                  {opp.organization}
                </p>
                <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                  {opp.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                {opp.is_remote ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Globe className="w-3.5 h-3.5" /> Remote Eligible
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {opp.location}
                  </span>
                )}
              </div>

              <a
                href={opp.apply_url || '#'}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!opp.apply_url || opp.apply_url === '#') {
                    e.preventDefault();
                    showToast('Opening external application portal...', 'info');
                  }
                }}
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Apply / Register</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
