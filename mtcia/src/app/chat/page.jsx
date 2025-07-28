'use client';
import { useState } from 'react';
import '../styles/chatbot.css'; 


export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const [context, setContext] = useState('');



  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, 
                             name: name, 
                             context: context })   ,
    });

    const data = await res.json();
    const botMessage = { role: 'bot', content: data.reply };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className='main-layout'>
      <div className='chat-header'>
        <div className='name-container'>
          <h3>Inserte el nombre de su chatbot</h3>
          <input
            className='name-input'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Escribe el nombre del chatbot...'
          />
        </div>
  
        <div className='context-container'>
          <h3>Inserte el contexto de su chatbot</h3>
          <textarea
            className='context-input'
            rows={6}
            value={context}
            onChange={e => setContext(e.target.value)}
            placeholder='Describe aquí el contexto que tendrá el chatbot...'
          />
        </div>
      </div>
  
      <div className="chat-container">
        <h2>{name || 'MSC AI'}</h2>
        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
