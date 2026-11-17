import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../lib/store';
import { ReportModal } from '../../components/moderation/ReportModal';
import { 
  MessageSquare, Send, Users, UserCheck, Shield, 
  Search, Flag, ShieldAlert, Sparkles, CheckCheck
} from 'lucide-react';

export const MessagingPage: React.FC = () => {
  const { 
    currentUser, conversations, messages, activeConversationId, 
    setActiveConversationId, sendMessage 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? messages[activeConv.id] || [] : [];

  const filteredConversations = conversations.filter(c => {
    if (!searchTerm) return true;
    return c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.members.some(m => m.display_name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages.length, activeConversationId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 h-[calc(100vh-6rem)] flex flex-col">
      {/* Container */}
      <div className="flex-1 flex overflow-hidden rounded-2xl bg-[#111827] border border-gray-800 shadow-2xl">
        {/* Left Pane: Conversations List */}
        <div className="w-80 shrink-0 border-r border-gray-800/80 flex flex-col bg-[#0D121F]/60">
          <div className="p-4 border-b border-gray-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Messages</span>
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold uppercase">
                Realtime
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111827] border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/60 p-2 space-y-1">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              const otherMember = conv.members.find(m => m.id !== currentUser.id) || conv.members[0];

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 ${
                    isActive
                      ? 'bg-blue-600/15 border border-blue-500/30 text-white'
                      : 'hover:bg-gray-800/50 text-gray-300 border border-transparent'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.is_group ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100' : otherMember?.avatar_path}
                      alt="Avatar"
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500/30"
                    />
                    {!conv.is_group && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111827]" />
                    )}
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {conv.title || otherMember?.display_name}
                      </p>
                      <span className="text-[10px] text-gray-500 shrink-0">
                        {conv.last_message ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 truncate mt-1">
                      {conv.last_message ? conv.last_message.content : 'No messages yet'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Chat Room */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-[#0B0F19]">
            {/* Chat Room Header */}
            <div className="p-4 border-b border-gray-800/80 bg-[#0E1522] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  {activeConv.is_group ? <Users className="w-5 h-5" /> : activeConv.title?.[0] || 'C'}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                    {activeConv.title}
                    {activeConv.members.some(m => m.is_mentor && m.id !== currentUser.id) && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-blue-500/20 text-blue-300">
                        Senior Mentor
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {activeConv.is_group
                      ? `${activeConv.members.length} student members`
                      : 'End-to-end peer encrypted channel • Online'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-gray-800 transition-colors"
                  title="Report user in chat"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              <div className="text-center py-2">
                <span className="text-[10px] text-gray-500 bg-gray-900/80 px-3 py-1 rounded-full border border-gray-800">
                  Messages are saved securely. Respect campus communication guidelines.
                </span>
              </div>

              {activeMessages.map((msg) => {
                const isMine = msg.sender_id === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMine && (
                      <img
                        src={msg.sender?.avatar_path || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
                        alt="Sender"
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/30 mb-1"
                      />
                    )}

                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs space-y-1 shadow-md ${
                        isMine
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-[#1F2937] text-gray-100 rounded-bl-none border border-gray-800'
                      }`}
                    >
                      {!isMine && activeConv.is_group && (
                        <p className="text-[10px] font-semibold text-blue-300">
                          {msg.sender?.display_name || 'Classmate'}
                        </p>
                      )}
                      <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
                      <div className={`flex items-center justify-end gap-1 text-[9px] ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
                        <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMine && <CheckCheck className="w-3 h-3 text-blue-200" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Composer */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-800/80 bg-[#0E1522] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message... (press Enter to send)"
                className="flex-1 bg-[#111827] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">Select a conversation</p>
            <p className="text-xs text-gray-400 mt-1">Start chatting with senior mentors or your project teammates.</p>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {activeConv && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="message"
          targetId={activeConv.id}
          targetPreview={`Conversation: ${activeConv.title}`}
        />
      )}
    </div>
  );
};
