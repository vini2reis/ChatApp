import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import HistoryScreen from './pages/History.jsx'
import ChatScreen from './pages/Chat.jsx'

export default function App() {
  return (
    <UserProvider>
      <Routes>
      <Route path='/' element={<ChatScreen />} />
        <Route path='/history/:user_id' element={<HistoryScreen />} />
      </Routes>
    </UserProvider>
  )
}
