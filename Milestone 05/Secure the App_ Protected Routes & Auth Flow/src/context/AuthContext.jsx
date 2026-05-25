import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

/**
 * AuthProvider provides the authentication state to the application.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user', error)
        setUser(null)
      }
    }
  }, [])

  const login = (userData, fakeToken) => {
    setUser(userData)
    setToken(fakeToken)
    localStorage.setItem('authToken', fakeToken)
    localStorage.setItem('authUser', JSON.stringify(userData))
    console.log('✅ User logged in:', userData.email)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    console.log('🚪 User logged out')
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
