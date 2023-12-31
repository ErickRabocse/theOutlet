import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import useFetch from '../hooks/useFetch'

// Step 1: Create context
const AdminContext = createContext()

// Step 2: Create context provider
const AdminProvider = ({ children }) => {
  const { loading, error, data } = useFetch('https://theoutlet.onrender.com/items')
  const [item, setItem] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  // SIGN IN SECTION
  const [loggedIn, setLoggedIn] = useState(false)
  const [users, setUsers] = useState(null)
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (token) => {
    const decoded = jwt_decode(token)
    const admin = decoded.role === 'ADMIN'
    setIsAdmin(admin)
    return admin
  }
  const logout = (e) => {
    localStorage.removeItem('jwt_token')
    setIsAdmin(false)
    e.removeItem()
  }
  // SHOPPING SECTION
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [itemsAmount, setItemsAmount] = useState(0)

  const deleteItem = (id) => {
    const newArr = order.filter(el => el.id !== id)
    setOrder(newArr)
    setItemsAmount(itemsAmount - 1)
  }

  const contextData = {
    isAdmin, login, logout, item, setItem, filteredItems, setFilteredItems, loading, error, data, loggedIn, setLoggedIn, users, setUsers, setUserName, userName, order, setOrder, total, setTotal, deleteItem, itemsAmount, setItemsAmount
  }
  return (
    <AdminContext.Provider value={contextData}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminProvider }
// Step 3: Wrap the high-hierarchy component in the provider (AdminProvider), such as: App.jsx
// Step 4: Create folder hooks with useAdmin.js
