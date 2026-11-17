import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../lib/store';
import { ReportReason } from '../../types';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'post' | 'comment' | 'message' | 'resource' | 'profile';
  targetId: string;
  targetPreview?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetPreview,
}) => {
  const { submitReport } = useApp();
  const [reason, setReason] = useState<ReportReason>('spam');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      target_type: targetType,
      target_id: targetId,
      target_preview: targetPreview,
      reason,
      context,
    });
    setContext('');
    onClose();
  };

  const reasonOptions: { value: ReportReason; label: string; desc: string }[] = [
    { value: 'spam', label: 'Spam or Unauthorized Promotion', desc: 'Commercial ads, telegram invite spam, or repetitive links' },
    { value: 'harassment', label: 'Harassment or Bullying', desc: 'Direct attacks, hate speech, or targeted hostility' },
    { value: 'misinformation', label: 'Academic Misinformation / Impersonation', desc: 'False exam dates, fake credentials, or impersonating university faculty' },
    { value: 'copyright', label: 'Copyright Violation / Leaked Papers', desc: 'Proprietary textbook distribution, NDA leaks, or copyright infringement' },
    { value: 'inappropriate', label: 'Inappropriate Content', desc: 'Content violating campus safety and community guidelines' },
    { value: 'other', label: 'Other Safety Concern', desc: 'Any other matter requiring moderator review' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Content to Campus Moderators"
      description="Help us maintain a safe, trusted, and respectful academic community."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {targetPreview && (
          <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs">
            <span className="text-gray-400 font-medium">Flagging {targetType}: </span>
            <span className="text-white italic">"{targetPreview.slice(0, 100)}..."</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300">Reason for report</label>
          <div className="space-y-2">
            {reasonOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  reason === opt.value
                    ? 'bg-blue-600/10 border-blue-500/50 text-white'
                    : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={opt.value}
                  checked={reason === opt.value}
                  onChange={() => setReason(opt.value)}
                  className="mt-0.5 text-blue-600 focus:ring-0"
                />
                <div>
                  <p className="text-xs font-medium">{opt.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Additional Context (Optional)</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Provide any specific details or timestamps to assist moderators..."
            rows={3}
            maxLength={500}
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-2 text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-amber-200/90">
            Reports are handled confidentially by assigned community moderators and platform administrators.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Submit Private Report
          </button>
        </div>
      </form>
    </Modal>
  );
};
