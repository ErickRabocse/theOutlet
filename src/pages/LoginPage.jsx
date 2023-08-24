import Login from './Form/Login'
import '@/styles/form.scss'

const LoginPage = () => {
  return (
    <div className='form__container'>
      <div className='form__img'>
        <img className='form__img__shopping' src='./couple_shopping.jpeg' alt='couple shopping' />
      </div>
      <div className='form__access'>
        <img className='form__logo' src='./logo.png' alt='store brand logo' />
        <Login />
      </div>
    </div>
  )
}
export default LoginPage
