import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext.jsx'

export default function Header() {
  const { currentUser, switchUser } = useUser()
  const navigate = useNavigate()
  const nextUser = currentUser === 'user_a' ? 'user_b' : 'user_a'

  const handleSwitchUser = () => {
    switchUser(nextUser)
    
    if (window.location.pathname.startsWith('/history')) {
        navigate(`/history/${nextUser}`)
    }
  }

  return (
    <header className='header'>
      <nav className='routes'>
        <Link to='/'>Chat</Link>
        <Link to={`/history/${currentUser}`}>Histórico</Link>
      </nav>

      <div className='user-control'>
        <span style={{ marginRight: '10px' }}>Usuário Ativo: <strong>{currentUser}</strong></span>
        
        <button onClick={handleSwitchUser}>
          Trocar para {nextUser.toUpperCase()}
        </button>
      </div>

    </header>
  )
}
