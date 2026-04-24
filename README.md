# 🌐 AI Language Translation Tool  ## 🔗 Live Demohttps://lingua-ai-tawny.vercel.app/

A ChatGPT-style **Language Translation Web App** built using **ReactJS and Firebase**.  
This app allows users to translate text in real-time and automatically saves translation history.

---

## 🚀 Features

- Real-time text translation  
- Multiple language selection  
- Chat-style UI (like ChatGPT)  
- Sidebar with previous translations  
- Firebase integration for storing history  
- Live updates using Firestore (onSnapshot)  
- Loading indicator during translation  

---

## 🛠️ Tech Stack

- Frontend: ReactJS (Vite)
- Database: Firebase Firestore
- API: Translation API (LibreTranslate or similar)
- Styling: CSS / Tailwind

---




## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/yourusername/your-repo-name.git  
cd your-repo-name  

---

### 2. Install dependencies

npm install  

---

### 3. Create Environment Variables

Create a `.env` file in the root directory and add the following:

VITE_API_KEY=your_translation_api_key  

VITE_FIREBASE_API_KEY=your_firebase_api_key  
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com  
VITE_FIREBASE_PROJECT_ID=your_project_id  

---

### 4. Important Notes About `.env`

- The `.env` file is **NOT included** in this repository for security reasons  
- You must create it manually  
- Do NOT upload `.env` to GitHub  
- `.env.example` file is provided for reference  

---

### 5. Run the project

npm run dev  

---

## 🔥 How It Works

1. User enters text and selects language  
2. App sends request to translation API  
3. Translated text is displayed in chat UI  
4. Data is saved in Firebase Firestore  
5. Sidebar updates in real-time  

---

## 📁 Folder Structure

src/  
│── components/  
│   ├── Sidebar.jsx  
│   ├── ChatWindow.jsx  
│   ├── MessageBubble.jsx  
│   ├── InputBox.jsx  
│  
│── services/  
│   ├── api.js  
│   ├── firestore.js  
│  
│── firebase.js  
│── App.jsx  

---

## 🎯 Future Improvements

- User authentication (Login/Signup)  
- Voice-to-text translation  
- Text-to-speech output  
- More language support  

---

## 🙌 Acknowledgment

This project is developed as part of the **CodeAlpha Internship Program**.

---

## 👨‍💻 Author

Neel Gadekar
