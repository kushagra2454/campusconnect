import React, { useState } from 'react';
import { useApp } from '../../lib/store';
import { UploadResourceModal } from './UploadResourceModal';
import { ReportModal } from '../../components/moderation/ReportModal';
import { Resource, ResourceType } from '../../types';
import { 
  BookOpen, Download, Bookmark, Flag, Filter, Plus, 
  Search, FileText, CheckCircle2, ShieldCheck, Sparkles, Building2
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { 
    resources, toggleBookmarkResource, downloadResource, 
    searchQuery, setIsAiModalOpen 
  } = useApp();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedUniv, setSelectedUniv] = useState<string>('all');
  
  // Reporting state
  const [reportTarget, setReportTarget] = useState<Resource | null>(null);

  // Filter resources
  const filteredResources = resources.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.resource_type === selectedCategory;
    const matchesSem = selectedSemester === 'all' || res.semester === selectedSemester;
    const matchesUniv = selectedUniv === 'all' || res.university_id === selectedUniv;
    const matchesSearch = !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.branch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSem && matchesUniv && matchesSearch;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Resources' },
    { id: 'pyq', label: 'Previous Year Papers (PYQs)' },
    { id: 'notes', label: 'Lecture Notes' },
    { id: 'lab_manual', label: 'Lab Manuals' },
    { id: 'assignment', label: 'Assignments' },
    { id: 'syllabus', label: 'Syllabus & Roadmaps' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-gray-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Academic Library
              </span>
              <span className="text-xs text-gray-400">• Peer-verified Materials</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Course Resources & PYQs
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Categorized question papers, lab manuals, and peer-reviewed study notes organized by university, semester, and course.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AI Syllabus Finder</span>
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-gray-800 space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-800/80">
          <div>
            <label className="text-[11px] font-medium text-gray-400 block mb-1">University</label>
            <select
              value={selectedUniv}
              onChange={(e) => setSelectedUniv(e.target.value)}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Universities</option>
              <option value="u1">Apex Institute of Technology (AIT)</option>
              <option value="u2">National Metro University (NMU)</option>
              <option value="u3">Horizon Engineering & Research (HERI)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-400 block mb-1">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full text-right text-xs text-gray-400">
              Showing <span className="font-semibold text-white">{filteredResources.length}</span> verified documents
            </div>
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#111827]/40 border border-gray-800 space-y-3">
            <BookOpen className="w-8 h-8 text-gray-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No resources found matching criteria</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Know where to find these question papers? Upload to help students in upcoming examinations!
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
            >
              Upload This Document
            </button>
          </div>
        ) : (
          filteredResources.map((res) => {
            const sizeInMb = (res.file_size_bytes / (1024 * 1024)).toFixed(1);
            return (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {res.resource_type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        Sem {res.semester} • {res.academic_year}
                      </span>
                    </div>

                    {/* Verification Status Badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      res.verification_badge === 'Moderator reviewed'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : res.verification_badge === 'Official source link'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {res.verification_badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs text-blue-400 font-medium mt-0.5">
                      Subject: {res.subject}
                    </p>
                    {res.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-800/80">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{res.university?.name || 'Affiliated College'}</span>
                    </div>
                    <span>{sizeInMb} MB • {res.downloads_count} downloads</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmarkResource(res.id)}
                        className={`p-2 rounded-xl border text-xs transition-colors ${
                          res.is_bookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                        }`}
                        title="Save to bookmarks"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${res.is_bookmarked ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => setReportTarget(res)}
                        className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-rose-400 transition-colors"
                        title="Report inaccurate or infringing file"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => downloadResource(res.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/20 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload Modal */}
      <UploadResourceModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      {/* Report Modal */}
      {reportTarget && (
        <ReportModal
          isOpen={Boolean(reportTarget)}
          onClose={() => setReportTarget(null)}
          targetType="resource"
          targetId={reportTarget.id}
          targetPreview={reportTarget.title}
        />
      )}
    </div>
  );
};
