import React, { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import Conversation from '../components/Conversation.jsx'
import { useUser } from '../contexts/UserContext.jsx'
import { sendMessage } from '../hooks/chatApi.js'

export default function ChatScreen() {
  const { currentUser } = useUser()
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setConversation([]) 
  }, [currentUser])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim() || loading) return

    const userMessage = {
      id: Date.now(), 
      user_id: currentUser,
      message: message.trim(),
      response: '', 
      sent_at: new Date().toISOString(),
      sender: currentUser,
    }

    setConversation(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

      const data = await sendMessage(currentUser, userMessage.message)

      const botResponse = {
        id: Date.now() + 1, 
        user_id: currentUser,
        message: data.response, 
        sent_at: new Date().toISOString(),
        sender: 'Bot',
      }

      setConversation(prev => [...prev, botResponse])

      setLoading(false)
  }

  return (
    <div className='container'>
      <Header />
      <div className='chat-box'>

        <div className='chat-conversation'>
          <Conversation messages={conversation} />
        </div>

        <form onSubmit={handleSend} className='chat-form'>
          <input
            className='message-bar'
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Conversando como ${currentUser}...`}
            disabled={loading}
          />
          <button className='send-button' type="submit" disabled={loading || !message.trim()}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}

