import { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import useFetch from '../hooks/useFetch'

// Step 1: Create context
const AdminContext = createContext()

// Step 2: Create context provider
const AdminProvider = ({ children }) => {
  // FETCH API SECTION
  const { loading, error, data } = useFetch('https://theoutlet.onrender.com/items')
  const [item, setItem] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  // SIGN IN SECTION
  const [isAdmin, setIsAdmin] = useState(false)
  const login = (token) => {
    const decoded = jwt_decode(token)
    const admin = decoded.role === 'ADMIN'
    setIsAdmin(admin)
    return admin
  }
  const logout = () => {
    localStorage.removeItem('jwt_token')
    setIsAdmin(false)
  }
  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, item, setItem, filteredItems, setFilteredItems, loading, error, data }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminProvider }

// Step 3: Wrap the high-hierarchy component in the provider (AdminProvider), such as: App.jsx
// Step 4: Create folder hooks with useAdmin.js
