import React from 'react';
import MessageItem from './MessageItem.jsx';

export default function Conversation({ messages }) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }
  
  return (
    <div className='conversation'>
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          sender={msg.sender}
          message={msg.message} 
          timestamp={msg.sent_at}
        />
      ))}
    </div>
  );
}