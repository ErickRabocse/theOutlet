import { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'

// Step 1: Create context
const AdminContext = createContext()

// Step 2: Create context provider
const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (token) => {
    const decoded = jwt_decode(token)
    console.log('THIS IS DECODED', decoded)
    const admin = decoded.role === 'ADMIN'
    setIsAdmin(admin)
    // return admin
  }

  const logout = () => {
    localStorage.removeItem('jwt_token')
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminProvider }

// Step 3: Wrap the high-hierarchy component in the provider (AdminProvider), such as: App.jsx
// Step 4: Create folder hooks with useAdmin.js
