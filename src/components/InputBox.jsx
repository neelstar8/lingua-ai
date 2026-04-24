import { useState } from 'react';

export default function InputBox({ onSend, isLoading }) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pt-6 pb-6 px-4 md:px-0">
      <div className={`max-w-3xl mx-auto relative flex items-center bg-[#2f2f2f] rounded-[24px] border border-gray-600/50 shadow-lg px-4 py-3 focus-within:ring-1 focus-within:ring-gray-500 transition-shadow ${isLoading ? 'opacity-70' : ''}`}>
        <input 
          type="text" 
          placeholder="Enter text to translate..." 
          className="flex-1 bg-transparent border-none outline-none text-[#ececec] placeholder-[#b4b4b4] text-base"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black w-5 h-5"><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          )}
        </button>
      </div>
      <div className="text-center text-xs text-[#b4b4b4] mt-3">
        AI Translator can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
