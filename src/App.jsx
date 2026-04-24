import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import LoginScreen from './components/LoginScreen';

function App() {
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#212121]">
        <div className="w-8 h-8 border-4 border-[#10a37f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#212121] font-sans text-[#ececec]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar 
          selectedHistoryItem={selectedHistoryItem} 
          onSelectHistoryItem={setSelectedHistoryItem}
          user={user}
        />
      </div>
      
      {/* Main Chat Area */}
      <ChatWindow 
        selectedHistoryItem={selectedHistoryItem} 
        onSelectHistoryItem={setSelectedHistoryItem}
        user={user}
      />
    </div>
  );
}

export default App;
