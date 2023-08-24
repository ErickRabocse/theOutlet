// import axios from 'axios'
import { useForm } from 'react-hook-form'
import { loginUserService } from '@/services/userService'
import './form.scss'
import { useAdminContext } from '@/hooks/useAdmin'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const { login } = useAdminContext()

  const sendData = async (data) => {
    console.log(data)
    // *----- THE CODE BELOW WAS TAKEN FROM CODE SNIPPET POSTMAN -----*
    // const config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://theoutlet.onrender.com/login',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: JSON.stringify(data)
    // }
    // axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data))
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // *----- THE CODE ABOVE WAS TAKEN FROM CODE SNIPPET POSTMAN -----*

    try {
      const response = await loginUserService(data)
      const token = response.data.token
      localStorage.setItem('jwt_token', token)
      console.log('RESPONSE', response, 'RESPONSE.DATA', response.data, 'RESPONSE.DATA.TOKEN', response.data.token)
      login(token)
      // const { data: token } = await loginUserService(data)
      // localStorage.setItem('jwt_token', token)
      // (token)
      // login(token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='form'>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(sendData)}>

        <div>
          <label>Email</label>
          <input
            className='form__input'
            type='text'
            {...register('email', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.email?.type === 'required' && (
            <p className='form__errorMessage'>This field is required</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            className='form__input'
            type='password'
            {...register('password', { required: true, maxLength: 50 })}
          />
          {errors.password?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
          {errors.password?.type === 'maxLength' && (
            <p className='form__errorMessage'>Max length 50 characters.</p>
          )}
        </div>
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

export default Login
