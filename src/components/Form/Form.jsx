import FormLogin from './FormLogin'
import FormRegister from './FormRegister'
import './form.scss'

const Form = () => {
  return (
    <div className='form__container'>
      <div className='form__img'>
        <img className='form__img__shopping' src='./couple_shopping.jpeg' alt='couple shopping' />
      </div>
      <div className='form__access'>
        <img className='form__logo' src='./logo.png' alt='store brand logo' />
        <FormLogin />
        <span className='form__or'>- OR -</span>
        <FormRegister />
      </div>

    </div>
  )
}
export default Form
