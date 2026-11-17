import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../lib/store';
import { 
  Sparkles, Send, BookOpen, FileText, CheckCircle2, 
  AlertTriangle, ArrowRight, CornerDownRight 
} from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, resources } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'find' | 'summarize' | 'refine'>('find');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    text: string;
    sources: string[];
    disclaimer: string;
  } | null>(null);

  const samplePrompts = [
    { label: 'Find 3rd Sem DSA PYQ', q: 'Where can I find solved question papers for 3rd sem Data Structures?' },
    { label: 'Summarize OS Notes', q: 'Summarize the key exam topics from Operating Systems lecture notes.' },
    { label: 'Refine exam prep question', q: 'Help me frame a question on how to score high marks in Engineering Mathematics I calculus.' },
  ];

  const handleAsk = (userQuery?: string) => {
    const textToAsk = userQuery || query;
    if (!textToAsk.trim()) return;

    setLoading(true);
    setResponse(null);

    // Simulated intelligent assistant matching the prompt, with citations & safety disclaimers
    setTimeout(() => {
      let answerText = '';
      let matchedSources: string[] = [];

      const lower = textToAsk.toLowerCase();
      if (lower.includes('dsa') || lower.includes('data structure')) {
        answerText = `Here is your exam study guidance for Data Structures & Algorithms:
• **High Weightage Topics:** Binary Search Trees, Graph BFS/DFS traversal, Dijkstra's Algorithm, and Dynamic Programming (Knapsack & LCS).
• **Recommended PYQ:** In the Resources tab, check "Data Structures & Algorithms - End-Sem 2025 Solved PYQ" uploaded by senior Aarav Sharma.
• **Practice Strategy:** Complete tree traversals first before attempting DP on Trees.`;
        matchedSources = ['AIT_DSA_EndSem_2025_Solved.pdf'];
      } else if (lower.includes('math') || lower.includes('calculus')) {
        answerText = `High-yield tips for Engineering Mathematics I:
• **Must-Study Topics:** Eigenvalues & Cayley-Hamilton theorem (regular 14 marks question in Section C), Multiple Integrals (Double and Triple), and Stokes' / Divergence theorems.
• **Referenced Papers:** 4-year compiled compendium available in Academic Resources.`;
        matchedSources = ['EnggMaths_1_PYQ_Compendium.pdf'];
      } else if (lower.includes('os') || lower.includes('operating')) {
        answerText = `Executive Summary of Operating Systems Unit 1-5:
• **Process Scheduling:** Round Robin (optimal quantum selection) & Multi-level Feedback Queue.
• **Synchronization:** Peterson's algorithm, Semaphores vs Mutex, Banker's Deadlock Avoidance algorithm.
• **Memory Management:** Paging, TLB hit ratio calculation, and LRU Page Replacement algorithms.`;
        matchedSources = ['OS_Complete_Notes_Unit1_5.pdf'];
      } else {
        answerText = `Search Results for "${textToAsk}":
Found 3 related student documents in the campus library. We recommend checking past question papers first to identify the recurring question formats used by faculty examiners.`;
        matchedSources = ['FLAT_Syllabus_Breakdown_2025.pdf', 'HERI_DBMS_Lab_Manual_v2.pdf'];
      }

      setResponse({
        text: answerText,
        sources: matchedSources,
        disclaimer: 'AI-generated study synthesis. Always corroborate with your university syllabus guidelines and professor instructions.',
      });
      setLoading(false);
    }, 800);
  };

  return (
    <Modal
      isOpen={isAiModalOpen}
      onClose={() => setIsAiModalOpen(false)}
      title="CampusConnect AI Academic Assistant"
      description="Natural language document search, exam question analysis, and syllabus summarizer."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Sample Quick Prompts */}
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(p.q);
                handleAsk(p.q);
              }}
              className="text-[11px] px-2.5 py-1 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-blue-500/50 transition-all text-left"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about a subject, syllabus unit, or question paper..."
            className="w-full bg-[#0D121F] border border-gray-800 rounded-xl pl-4 pr-12 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="p-8 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-blue-400 animate-spin mx-auto" />
            <p className="text-xs text-gray-400">Scanning verified academic resources and syllabus roadmap...</p>
          </div>
        )}

        {/* Response Box */}
        {response && !loading && (
          <div className="p-4 rounded-2xl bg-[#0D121F] border border-blue-900/50 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                AI Synthesis
              </span>
              <span className="text-xs text-gray-400">Gemini Academic Assistant</span>
            </div>

            <div className="text-xs text-gray-200 whitespace-pre-line leading-relaxed space-y-1">
              {response.text}
            </div>

            {/* Source Citations */}
            {response.sources.length > 0 && (
              <div className="pt-3 border-t border-gray-800 space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Referenced Peer Documents:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {response.sources.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-gray-900 text-blue-300 border border-gray-800 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-2 text-amber-300 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-200/80 leading-normal">{response.disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
