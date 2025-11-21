import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';
import { translateMessage } from './aiService';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  // 1. New State: Track which message has its "Language Menu" open
  const [menuOpenId, setMenuOpenId] = useState(null); 
  
  // Track translated text: { "msg_id": "Bonjour text..." }
  const [translatedCache, setTranslatedCache] = useState({});
  const [loadingIds, setLoadingIds] = useState({});

  const messagesEndRef = useRef(null);

  const [myId] = useState(() => {
    const savedId = localStorage.getItem('userId');
    return savedId || Date.now().toString();
  });

  useEffect(() => {
    localStorage.setItem('userId', myId);
  }, [myId]);

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }
      const rawMessages = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val
      }));
      setMessages(rawMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const messagesRef = ref(db, 'messages');
    await push(messagesRef, {
      type: 'text',
      text: input,
      senderId: myId,
      timestamp: Date.now()
    });
    setInput('');
  };

  // 2. Toggle the Menu
  const toggleMenu = (id) => {
    if (menuOpenId === id) {
      setMenuOpenId(null); // Close if already open
    } else {
      setMenuOpenId(id); // Open this specific menu
    }
  };

  // 3. Perform the Translation
  const handleLanguageSelect = async (msg, langCode) => {
    setMenuOpenId(null); // Close menu
    
    // If they chose "Original", just remove from cache
    if (langCode === 'original') {
      const newCache = { ...translatedCache };
      delete newCache[msg.id];
      setTranslatedCache(newCache);
      return;
    }

    setLoadingIds(prev => ({ ...prev, [msg.id]: true }));
    
    // Call API with the SPECIFIC language chosen
    const translatedText = await translateMessage(msg.text, langCode);
    
    setTranslatedCache(prev => ({ ...prev, [msg.id]: translatedText }));
    setLoadingIds(prev => ({ ...prev, [msg.id]: false }));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Anonymous</h1>
        {/* Removed the top selector - much cleaner! */}
        <p style={{fontSize: '0.8rem', opacity: 0.6}}>Click the 🌐 icon to translate</p>
      </header>

      <div className="chat-window">
        {messages.map((msg) => {
          const isMine = msg.senderId === myId;
          const isTranslated = !!translatedCache[msg.id];
          const isLoading = !!loadingIds[msg.id];
          const isMenuOpen = menuOpenId === msg.id;

          return (
            <div key={msg.id} className={`message-row ${isMine ? 'my-row' : 'other-row'}`}>
              
              {/* Add relative positioning so the popup stays attached to the bubble */}
              <div className={`message-bubble ${isMine ? 'my-message' : 'other-message'}`} style={{position: 'relative'}}>
                
                <div className="message-text">
                  {isTranslated ? translatedCache[msg.id] : msg.text}
                </div>

                {isTranslated && (
                  <small className="original-text">Original: {msg.text}</small>
                )}
                
                {/* 4. The Action Bar (Globe Icon) */}
                {!isMine && (
                  <div className="bubble-actions">
                     <button 
                        className="translate-btn" 
                        onClick={() => toggleMenu(msg.id)}
                        title="Translate"
                     >
                       {isLoading ? "⏳" : "🌐"}
                     </button>
                  </div>
                )}

                {/* 5. THE POPUP MENU (Visible only when isMenuOpen is true) */}
              {/* THE POPUP MENU (Now Global & Centered) */}
                {isMenuOpen && (
                  <>
                    {/* 1. Invisible Backdrop to close menu when clicking outside */}
                    <div className="modal-backdrop" onClick={() => setMenuOpenId(null)}></div>

                    {/* 2. The Menu */}
                    <div className="language-popup">
                      <div className="popup-title">Translate to...</div>
                      
                      <button onClick={() => handleLanguageSelect(msg, 'eng_Latn')}>🇬🇧 English</button>
                      <button onClick={() => handleLanguageSelect(msg, 'fra_Latn')}>🇫🇷 French</button>
                      <button onClick={() => handleLanguageSelect(msg, 'deu_Latn')}>🇩🇪 German</button>
                      <button onClick={() => handleLanguageSelect(msg, 'jpn_Jpan')}>🇯🇵 Japanese</button>
                      <button onClick={() => handleLanguageSelect(msg, 'zho_Hans')}>🇨🇳 Chinese</button>
                      <button onClick={() => handleLanguageSelect(msg, 'spa_Latn')}>🇪🇸 Spanish</button>
                      
                      <div className="divider"></div>
                      
                      <button onClick={() => handleLanguageSelect(msg, 'original')}>↩️ Original</button>
                      {/* Optional Cancel button */}
                      <button className="cancel-btn" onClick={() => setMenuOpenId(null)}>Cancel</button>
                    </div>
                  </>
                )}

              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="input-area">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button type="submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default App;