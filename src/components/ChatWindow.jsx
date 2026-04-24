import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import LanguageSelector from './LanguageSelector';
import { translateText } from '../api';
import { createChat, updateChat } from '../services/firestore';

export default function ChatWindow({ selectedHistoryItem, onSelectHistoryItem, user }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('Auto');
  const [targetLang, setTargetLang] = useState('English');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle loading a selected history item
  useEffect(() => {
    if (selectedHistoryItem) {
      // Use the messages array from the chat document, or empty array if none
      setMessages(selectedHistoryItem.messages || []);
      setSourceLang(selectedHistoryItem.sourceLanguage);
      setTargetLang(selectedHistoryItem.targetLanguage);
    } else {
      setMessages([]);
    }
  }, [selectedHistoryItem]);

  const handleSendText = async (text) => {
    const userMsg = { role: 'user', content: text };
    
    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const translatedText = await translateText(text, sourceLang, targetLang);
      
      // Ensure we have translated text before continuing
      if (!translatedText) {
        throw new Error("Translation returned empty result");
      }

      const aiMsg = { role: 'ai', content: translatedText };

      // Add translated response after API returns
      setMessages((prev) => [...prev, aiMsg]);
      
      // Turn off loading indicator immediately so UI is responsive
      setIsLoading(false);
      
      if (selectedHistoryItem) {
        // We are inside an existing chat session. Append to it.
        await updateChat(selectedHistoryItem.id, [userMsg, aiMsg]);
      } else {
        // We are starting a new chat session.
        const newChat = await createChat({
          title: text.substring(0, 30) + (text.length > 30 ? '...' : ''), // Generate title from first message
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          userId: user?.uid,
          messages: [userMsg, aiMsg]
        });
        
        // Select the newly created item
        onSelectHistoryItem(newChat);
      }
      
    } catch (error) {
      console.error("Error during translation flow:", error);
      setMessages((prev) => [
        ...prev, 
        { role: 'error', content: `Translation failed: ${error.message || 'Please try again.'}` }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 relative h-full bg-[#212121] flex flex-col">
      {/* Header for mobile or just spacing */}
      <div className="h-14 flex items-center px-4 sticky top-0 bg-[#212121]/90 backdrop-blur z-10 text-[#ececec] font-medium text-lg border-b border-white/10 md:hidden">
        AI Translator
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-36 pt-4">
        <LanguageSelector 
          sourceLang={sourceLang} 
          targetLang={targetLang} 
          setSourceLang={setSourceLang} 
          setTargetLang={setTargetLang} 
        />
        
        <div className="max-w-3xl mx-auto px-4 flex flex-col min-h-[calc(100%-80px)] justify-center">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in opacity-80 mt-10">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black font-bold text-2xl shadow-xl">
                AI
              </div>
              <h1 className="text-2xl font-semibold text-[#ececec]">Enter text to translate</h1>
            </div>
          ) : (
            <div className="flex flex-col justify-end min-h-full">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="w-full flex justify-start mb-6">
                  <div className="max-w-[80%] md:max-w-3xl px-4 py-3 rounded-2xl bg-transparent text-[#ececec]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">
                        AI
                      </div>
                    </div>
                    <div className="ml-0 sm:ml-9 flex items-center gap-1 text-[#b4b4b4]">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="ml-2 text-sm">Translating...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <InputBox onSend={handleSendText} isLoading={isLoading} />
    </main>
  );
}
