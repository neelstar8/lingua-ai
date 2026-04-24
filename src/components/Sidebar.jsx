import { useState, useEffect } from 'react';
import { subscribeToChats } from '../services/firestore';
import { signOutUser } from '../services/auth';

export default function Sidebar({ selectedHistoryItem, onSelectHistoryItem, user }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    // Subscribe to real-time updates from Firestore for this specific user
    const unsubscribe = subscribeToChats(user.uid, (fetchedChats) => {
      setChats(fetchedChats);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Failed to sign out");
    }
  };

  return (
    <aside className="w-64 h-full bg-[#171717] flex flex-col transition-all duration-300">
      <div 
        className="p-4 flex items-center justify-between hover:bg-[#212121] cursor-pointer mx-2 rounded-md transition-colors mt-2"
        onClick={() => onSelectHistoryItem(null)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
            AI
          </div>
          <span className="font-medium text-sm text-[#ececec]">New Translation</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 mt-4 space-y-1">
        <p className="text-xs text-[#b4b4b4] px-2 mb-3 font-semibold">History</p>
        
        {chats.length === 0 ? (
          <div className="px-2 py-2 text-xs text-[#b4b4b4] italic">
            No previous chats
          </div>
        ) : (
          chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => onSelectHistoryItem(chat)}
              className={`px-3 py-3 text-sm text-[#ececec] hover:bg-[#212121] rounded-md cursor-pointer transition-colors ${selectedHistoryItem?.id === chat.id ? 'bg-[#2a2a2a]' : ''}`}
            >
              <div className="font-medium truncate">{chat.title || 'New Chat'}</div>
              <div className="text-xs text-[#b4b4b4] truncate mt-1">
                {chat.sourceLanguage} → {chat.targetLanguage}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-auto border-t border-gray-700/50 p-2">
        <div className="flex items-center gap-3 p-2 mx-1 rounded-md mb-2">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold text-white">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-[#ececec] font-medium truncate">{user?.displayName || 'User'}</span>
            <span className="text-xs text-[#b4b4b4] truncate">{user?.email}</span>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="w-full text-left p-2 text-sm text-red-400 hover:bg-[#212121] rounded-md transition-colors px-3"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
