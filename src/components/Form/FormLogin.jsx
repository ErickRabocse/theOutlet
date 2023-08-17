// import React from "react";
import { useForm } from 'react-hook-form'
import './form.scss'

const FormRegister = () => {
  const {
    register,
    formState: { errors },

    handleSubmit
  } = useForm()

  const onSubmit = (info) => {
    console.log(info)
  }

  return (
    <div className='form'>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Username</label>
          <input
            type='text'
            {...register('username', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.username?.type === 'required' && (
            <p className='form__errorMessage'>This field is required</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
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

export default FormRegister
