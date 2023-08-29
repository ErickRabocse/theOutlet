import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Home, Secret, LoginPage, SignupPage, ProductDetails } from '@/pages'
import { useAdminContext } from '@/hooks/useAdmin'

const RoutesIndex = () => {
  // IMPORTING: THE isAdmin state
  const { isAdmin } = useAdminContext()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/items/:id' element={<ProductDetails />} />
      <Route path='/loginPage' element={<LoginPage />} />
      <Route path='/signupPage' element={<SignupPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route
        path='/secret' element={
        isAdmin
          ? <Secret />
          : <Navigate to='/' />
      }
      />
    </Routes>
  )
}

export default RoutesIndex
