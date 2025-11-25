import React from 'react'

export default function MessageItem ({ sender, message, timestamp }) {
  const isUser = sender !== 'Bot'
  
  const messageClass = isUser ? 'message-user' : 'message-bot'
  const senderClass = isUser ? 'sender-user' : 'sender-bot'
  const timeClass = isUser ? 'time-user' : 'time-bot'

  return (
    <div className={`message-bubble ${messageClass}`}>
      <span className={`sender-name ${senderClass}`}>{sender}</span>
      <div>{message}</div>
      <span className={`message-timestamp ${timeClass}`}>
        {new Date(timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}