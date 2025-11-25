import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import HistoryScreen from './pages/History.jsx'

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/history/:user_id' element={<HistoryScreen />} />
      </Routes>
    </UserProvider>
  )
}
