import { useForm } from 'react-hook-form'
import { loginUserService, getActiveUser } from '@/services/userService'
import { useAdminContext } from '@/hooks/useAdmin'
import { useNavigate } from 'react-router-dom'
import '@/styles/form.scss'
// import { useEffect } from 'react'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const { login, setLoggedIn, setUserName } = useAdminContext()
  const navigate = useNavigate()

  const sendData = async (data) => {
    /* STORING IN LOCAL STORAGE, THE login user DATA
    localStorage.setItem('user_data', JSON.stringify(data))
    const dataRETRIEVED = localStorage.getItem('user_data')
    const unquotedData = dataRETRIEVED.replace(/"([^"]+)":/g, '$1:')
    console.log('DATA RETRIEVED unquoted: ', unquotedData)
    */
    try {
      const response = await loginUserService(data)
      console.log('THIS IS THE loginUserService RESPONSE: ', response)
      // GETTING THE STATUS FROM LOGIN
      const userStatus = response.status === 200
      setLoggedIn(userStatus)
      const token = response.data.token
      localStorage.setItem('jwt_token', token)
      const admin = login(token)
      navigate(admin ? '/secret' : '/')
      // SETTING USER NAME
      const userData = await getActiveUser(token)
      const userNameFetched = userData.data.first_name
      setUserName(userNameFetched)
    } catch (error) {
      console.error(error)
    }
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
  }

  // useEffect(() => {
  //   const fetchingUserName = async () => {
  //     const dataRETRIEVED = localStorage.getItem('user_data')
  //     const unquotedData = dataRETRIEVED.replace(/"([^"]+)":/g, '$1:')
  //     console.log('DATA RETRIEVED unquoted: ', unquotedData)
  //     console.log('unquoted data using useEffect', unquotedData)
  //     const tokenRETRIEVED = await localStorage.getItem('jwt_token')
  //     console.log('tokenRetrieved using useEffect', tokenRETRIEVED)
  //     const userData = await getActiveUser(tokenRETRIEVED)
  //     console.log('userData using useEffect', userData)
  //     const userNameFetched = userData.data.first_name
  //     console.log('userName using useEffect', userNameFetched)
  //     setUserName(userNameFetched)
  //   }
  //   fetchingUserName()
  // }, [])

  return (
    <div className='form'>
      <h2 className='title'>Log in</h2>
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
        <input className='form__send_btn' type='submit' value='Send' />
      </form>
    </div>
  )
}

export default Login
