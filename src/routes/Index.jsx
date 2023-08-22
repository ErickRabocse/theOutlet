import { Routes, Route } from 'react-router-dom'
import { Dashboard, Home, Secret, LoginPage, SignupPage } from '@/pages'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/loginPage' element={<LoginPage />} />
      <Route path='/signupPage' element={<SignupPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/secret' element={<Secret />} />
    </Routes>
  )
}

export default RoutesIndex
