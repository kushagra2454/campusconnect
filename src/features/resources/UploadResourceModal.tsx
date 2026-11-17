import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../lib/store';
import { ResourceType } from '../../types';
import { Upload, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, uploadResource, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState<number>(currentUser.study_year ? currentUser.study_year * 2 - 1 : 3);
  const [resourceType, setResourceType] = useState<ResourceType>('pyq');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [branch, setBranch] = useState(currentUser.branch || 'Computer Science & Engineering');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState<number>(0);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        showToast('Maximum allowed file size is 25MB', 'error');
        return;
      }
      setSelectedFileName(file.name);
      setSelectedFileSize(file.size);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) {
      showToast('Please provide a title and subject', 'error');
      return;
    }
    if (!isAgreed) {
      showToast('Please agree to academic integrity & copyright terms', 'error');
      return;
    }

    uploadResource({
      title: title.trim(),
      description: description.trim(),
      branch,
      semester,
      subject: subject.trim(),
      resource_type: resourceType,
      academic_year: academicYear,
      fileName: selectedFileName || `${subject.replace(/\s+/g, '_')}_Notes.pdf`,
      fileSize: selectedFileSize || 3500000,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSubject('');
    setSelectedFileName('');
    setIsAgreed(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Academic Resource / PYQ"
      description="Help fellow students by contributing verified question papers, lab manuals, and handwritten notes."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1">Resource Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Operating Systems End-Sem 2025 Solved Question Paper"
            required
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject & Resource Type Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Subject Name *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Operating Systems / CS-301"
              required
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Resource Category *</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value as ResourceType)}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="pyq">Previous Year Paper (PYQ)</option>
              <option value="notes">Lecture Notes / Study Material</option>
              <option value="lab_manual">Lab Manual / Code Experiments</option>
              <option value="assignment">Assignment Solutions</option>
              <option value="syllabus">Syllabus & Course Roadmap</option>
            </select>
          </div>
        </div>

        {/* Semester & Academic Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="e.g. 2024-2025"
              className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1">Description / Topic Coverage</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mention key topics, professors notes, or specific exam patterns covered..."
            rows={3}
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File Drag and Drop Picker */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">Select PDF or Document</label>
          <div className="relative border-2 border-dashed border-gray-800 hover:border-blue-500/60 rounded-2xl p-4 text-center cursor-pointer transition-all bg-gray-900/40">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-1.5">
              <Upload className="w-6 h-6 text-blue-400" />
              {selectedFileName ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <FileText className="w-4 h-4" />
                  <span>{selectedFileName} ({(selectedFileSize / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-white">Click or drag & drop document</p>
                  <p className="text-[10px] text-gray-400">Supported formats: PDF, DOCX (Max: 25MB)</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Academic Integrity & Copyright Acknowledgment */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 cursor-pointer">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="mt-0.5 rounded text-blue-600 focus:ring-0"
          />
          <div className="text-[11px] text-blue-200/90 leading-relaxed">
            <span className="font-semibold text-white">Academic Integrity & Copyright Pledge: </span>
            I certify that this upload contains legitimate study notes or past exam questions, does not violate copyright, and does not contain unauthorized leaked examination material.
          </div>
        </label>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Upload Document
          </button>
        </div>
      </form>
    </Modal>
  );
};
