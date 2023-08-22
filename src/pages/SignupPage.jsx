import Register from './Form/Register'
import './Form/form.scss'

const SignupPage = () => {
  return (
    <div className='form__container'>
      <div className='form__img'>
        <img className='form__img__shopping' src='./couple_shopping.jpeg' alt='couple shopping' />
      </div>
      <div className='form__access'>
        <img className='form__logo' src='./logo.png' alt='store brand logo' />
        <Register />
      </div>
    </div>
  )
}
export default SignupPage
