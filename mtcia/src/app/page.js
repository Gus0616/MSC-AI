'use client';

import React from 'react';
import './styles/home.css'; // CSS global, sin usar "styles from"

export default function Home() {
  return (
    <div className='home-container'>
      <h1 className='title'>Welcome</h1>
      <button className='chat-button' onClick={() => window.location.href = '/chat'}>
        Ir al chat
      </button>
    </div>
  );
}
