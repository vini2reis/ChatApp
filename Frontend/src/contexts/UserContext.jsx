import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('user_a')

  const switchUser = (userId) => {
    setCurrentUser(userId)
  }

  return (
    <UserContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  )
}