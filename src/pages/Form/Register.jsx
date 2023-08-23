import { useForm } from 'react-hook-form'
import { registerUserService } from '@/services/userService'
import './form.scss'

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const sendData = async (data) => {
    try {
      const response = await registerUserService(data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='form'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(sendData)}>

        <div>
          <label>First name</label>
          <input
            className='form__input'
            type='text'
            {...register('first_name', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.first_name?.type === 'required' && (
            <p className='form__errorMessage'>This field is required</p>
          )}
        </div>

        <div>
          <label>Last name</label>
          <input
            className='form__input'
            type='text'
            {...register('last_name', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.last_name?.type === 'required' && (
            <p className='form__errorMessage'>This field is required</p>
          )}
        </div>

        <div>
          <label>Gender</label>
          <select className='form__input form__input--select' {...register('gender', { required: true })}>
            <option value=''>Select</option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
          {errors.gender?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
        </div>

        <div>
          <label>Email Address</label>
          <input
            className='form__input'
            type='email'
            {...register('email', {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            })}
          />
          {errors.email?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className='form__errorMessage'>
              The email doesn&apos;t have a valid format.
            </p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            className='form__input'
            type='password'
            {...register('password', {
              required: true,
              minLength: 8
              // validate: ageValidator
            })}
          />
          {errors.password?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='form__errorMessage'>Your password must be at least 8 characters long.</p>
          )}
        </div>
        {/* <div>
          <label>Include gender?</label>
          <input type='checkbox' {...register('includeGender')} />
        </div>
        {includeGender && (
          <div>
            <label>Gender</label>
            <select className='form__input form__input--select' {...register('gender', { required: true })}>
              <option value=''>Select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='non-binary'>Non-binary</option>
            </select>
            {errors.gender?.type === 'required' && (
              <p className='form__errorMessage'>This field is required.</p>
            )}
          </div>
        )} */}

        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default Register
