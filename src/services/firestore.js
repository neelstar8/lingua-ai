import { collection, addDoc, updateDoc, doc, serverTimestamp, onSnapshot, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

const TRANSLATIONS_COLLECTION = 'translations'; // Keeping same name to reuse security rules

/**
 * Creates a new chat session
 * @param {Object} data 
 * @param {string} data.userId
 * @param {string} data.title
 * @param {string} data.sourceLanguage
 * @param {string} data.targetLanguage
 * @param {Array} data.messages - Initial messages array [{role, content}]
 */
export const createChat = async (data) => {
  if (!data.userId) throw new Error("userId is required to create a chat");
  
  try {
    const docRef = await addDoc(collection(db, TRANSLATIONS_COLLECTION), {
      ...data,
      timestamp: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating chat in Firestore: ", error);
    throw error;
  }
};

/**
 * Appends messages to an existing chat session
 * @param {string} chatId 
 * @param {Array} newMessages - Array of new messages to append
 */
export const updateChat = async (chatId, newMessages) => {
  try {
    const chatRef = doc(db, TRANSLATIONS_COLLECTION, chatId);
    await updateDoc(chatRef, {
      messages: arrayUnion(...newMessages),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating chat: ", error);
    throw error;
  }
};

/**
 * Subscribes to real-time updates of chats for a specific user
 * Sorts locally to avoid requiring a composite index in Firestore
 */
export const subscribeToChats = (userId, callback) => {
  if (!userId) return () => {};

  const q = query(
    collection(db, TRANSLATIONS_COLLECTION), 
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (querySnapshot) => {
    let chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort client-side: newest updated first
    chats.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || a.timestamp?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || b.timestamp?.toMillis?.() || 0;
      return timeB - timeA;
    });
    
    callback(chats);
  }, (error) => {
    console.error("Error fetching chats: ", error);
  });
};
