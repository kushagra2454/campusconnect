import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../lib/store';
import { mockUniversities } from '../../lib/mock-data';
import { 
  Building2, GraduationCap, Sparkles, Check, 
  ArrowRight, Users, CheckCircle2 
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { completeOnboarding, communities, joinCommunity } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedUnivId, setSelectedUnivId] = useState<string>(mockUniversities[0].id);
  const [program, setProgram] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [studyYear, setStudyYear] = useState<number>(1);
  const [skills, setSkills] = useState<string[]>(['C++', 'Python', 'Web Dev']);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>(['Hackathons', 'Placements 2026', 'Open Source']);
  const [joinedCommIds, setJoinedCommIds] = useState<string[]>([]);

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills(prev => [...prev, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleToggleCommunity = (commId: string) => {
    if (joinedCommIds.includes(commId)) {
      setJoinedCommIds(prev => prev.filter(id => id !== commId));
    } else {
      setJoinedCommIds(prev => [...prev, commId]);
      joinCommunity(commId);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      university_id: selectedUnivId,
      program,
      branch,
      study_year: studyYear,
      skills,
      interests,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Student Onboarding (Step ${step} of 3)`}
      description="Personalize your campus network and get access to verified course materials."
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Step Progress Dots */}
        <div className="flex items-center justify-center gap-2 pb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step
                  ? 'w-8 bg-blue-600'
                  : s < step
                  ? 'w-4 bg-emerald-500'
                  : 'w-4 bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Select University */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              1. Select your Higher Education Institution
            </h3>

            <div className="space-y-2">
              {mockUniversities.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUnivId(u.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedUnivId === u.id
                      ? 'bg-blue-600/15 border-blue-500/60 text-white'
                      : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                      {u.short_code}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{u.name}</p>
                      <p className="text-[10px] text-gray-400">{u.city}, {u.state}</p>
                    </div>
                  </div>
                  {selectedUnivId === u.id && (
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/25 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Program, Branch, Year */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              2. Academic Program & Study Year
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Degree / Program</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="B.Tech">B.Tech / B.E. (Bachelor of Technology)</option>
                  <option value="B.Sc">B.Sc (Bachelor of Science)</option>
                  <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                  <option value="M.Tech">M.Tech / M.E. (Master of Technology)</option>
                  <option value="MCA">MCA (Master of Computer Applications)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Department / Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-[#0D121F] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Current Study Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((yr) => (
                    <button
                      type="button"
                      key={yr}
                      onClick={() => setStudyYear(yr)}
                      className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                        studyYear === yr
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Year {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/25"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Recommended Communities to Join */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              3. Recommended Communities for You
            </h3>
            <p className="text-xs text-gray-400">
              Select communities to populate your personalized feed:
            </p>

            <div className="space-y-2">
              {communities.map((c) => {
                const isSelected = joinedCommIds.includes(c.id) || c.is_member;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleToggleCommunity(c.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500/50 text-white'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{c.name}</p>
                      <p className="text-[10px] text-gray-400">{c.description.slice(0, 75)}...</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {isSelected ? 'Selected' : 'Join'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Enter CampusConnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
