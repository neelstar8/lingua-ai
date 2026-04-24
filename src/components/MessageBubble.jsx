import { useState } from 'react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  const isError = role === 'error';
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`max-w-[80%] md:max-w-3xl px-4 py-3 rounded-2xl relative ${isUser ? 'bg-[#2f2f2f] text-[#ececec]' : 'bg-transparent text-[#ececec]'} ${isError ? 'text-red-400' : ''}`}>
        {!isUser && (
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isError ? 'bg-red-500 text-white' : 'bg-white text-black'}`}>
              AI
            </div>
          </div>
        )}
        <div className="prose prose-invert leading-relaxed whitespace-pre-wrap ml-0 sm:ml-9">
          {content}
        </div>
        
        {/* Copy Button for AI responses */}
        {!isUser && !isError && (
          <button 
            onClick={handleCopy}
            className="absolute -bottom-6 sm:bottom-2 left-0 sm:-left-8 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#b4b4b4] hover:text-white rounded"
            title="Copy translation"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
