

import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Conversation from '../components/Conversation.jsx'
import { useUser } from '../contexts/UserContext.jsx'
import { getHistory } from '../hooks/chatApi.js'

export default function HistoryScreen() {
  const { currentUser } = useUser()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)

      const data = await getHistory(currentUser) 

      const conversation = data.flatMap(msg => [

        { sender: msg.user_id, message: msg.message, sent_at: msg.sent_at },

        { sender: 'Bot', message: msg.response, sent_at: msg.sent_at },
      ])
      
      setHistory(conversation)
      setLoading(false)
    }

    fetchHistory()
  }, [currentUser])

  return (
    <div className='container'>
      <Header />
      <h2>Conversa - {currentUser.toUpperCase()}</h2>
      
      {loading && <p>Carregando histórico...</p>}
      
      {!loading && history.length === 0 && (
        <p>Nenhuma mensagem encontrada para {currentUser}.</p>
      )}

      <Conversation messages={history} />
    </div>
  )
}
