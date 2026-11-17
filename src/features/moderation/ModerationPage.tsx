import React, { useState } from 'react';
import { useApp } from '../../lib/store';
import { ModerationActionType } from '../../types';
import { 
  ShieldAlert, CheckCircle2, XCircle, AlertTriangle, 
  Eye, FileText, Ban, UserX, Clock, Filter 
} from 'lucide-react';

export const ModerationPage: React.FC = () => {
  const { currentUser, reports, handleModerationAction, switchUser } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const isAuthorized = currentUser.role === 'moderator' || currentUser.role === 'admin';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Access Restricted</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          The Moderation Hub requires a verified Campus Moderator or Platform Administrator role.
        </p>
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-xs text-left max-w-md mx-auto space-y-2">
          <p className="font-semibold text-white">Demonstration & Evaluation Shortcut:</p>
          <p className="text-gray-400">
            Switch to the pre-configured Moderator profile (Priya Patel) using the account selector in the top bar to inspect this dashboard.
          </p>
          <button
            onClick={() => switchUser('p2')}
            className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all mt-1"
          >
            Switch to Priya Patel (Moderator)
          </button>
        </div>
      </div>
    );
  }

  const filteredReports = reports.filter(r => {
    if (selectedStatus === 'all') return true;
    return r.status === selectedStatus;
  });

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'harassment':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">Harassment</span>;
      case 'spam':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">Spam</span>;
      case 'copyright':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">Copyright / Leaks</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">{reason}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">Open Queue</span>;
      case 'under_review':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">Under Review</span>;
      case 'action_taken':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Action Taken</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-gray-800 text-gray-400">Dismissed</span>;
    }
  };

  const handleApplyAction = (reportId: string, action: ModerationActionType) => {
    handleModerationAction(reportId, action, notes);
    setActiveReportId(null);
    setNotes('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-gray-900 to-indigo-950/40 border border-purple-900/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
            Trust & Safety Hub
          </span>
          <span className="text-xs text-gray-400">• Moderator: {currentUser.display_name}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Campus Moderation & Audit Console
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
          Review reported questions, posts, study resources, and direct harassment. Actions taken are immutably logged for audit.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'open', 'under_review', 'action_taken', 'dismissed'].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
              selectedStatus === status
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Reports Queue */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111827]/40 border border-gray-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">Queue Clear!</h3>
            <p className="text-xs text-gray-400">No content reports requiring review in this category.</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-5 rounded-2xl bg-[#111827] border border-gray-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-800/80">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(report.status)}
                  {getReasonBadge(report.reason)}
                  <span className="text-xs text-gray-400">
                    Flagged <span className="font-semibold text-white uppercase">{report.target_type}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reported by {report.reporter.display_name}</span>
                </div>
              </div>

              {/* Target Preview Box */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800/90 text-xs space-y-1">
                <p className="text-[11px] text-gray-400 font-medium">Flagged Item Preview:</p>
                <p className="text-white font-medium italic">"{report.target_preview}"</p>
                {report.context && (
                  <p className="text-amber-300/90 text-[11px] mt-1 pt-1 border-t border-gray-800">
                    <span className="font-semibold text-amber-400">Reporter's Note:</span> {report.context}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-gray-500">
                  Target ID: <code className="bg-black/30 px-1 py-0.5 rounded text-gray-400">{report.target_id}</code>
                </div>

                {report.status !== 'action_taken' && report.status !== 'dismissed' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApplyAction(report.id, 'dismiss')}
                      className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium border border-gray-700 transition-colors"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => handleApplyAction(report.id, 'warn_user')}
                      className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600 hover:text-white text-amber-300 border border-amber-500/30 text-xs font-medium transition-all"
                    >
                      Issue Formal Warning
                    </button>
                    <button
                      onClick={() => handleApplyAction(report.id, 'hide_content')}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all"
                    >
                      Hide & Remove Content
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500 italic">
                    Resolved by Moderator
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
