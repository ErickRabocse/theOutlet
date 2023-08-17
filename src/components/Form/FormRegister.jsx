// import React from "react";
import { useForm } from 'react-hook-form'
import { ageValidator } from './ageValidator'
import './form.scss'

const FormLogin = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm({
    defaultValues: {
      name: 'Erick Chávez',
      address: 'Galeana #1'
    }
  })

  const onSubmit = (info) => {
    console.log(info)
  }

  const includeGender = watch('includeGender')

  return (
    <div className='form'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input
            type='text'
            {...register('name', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.name?.type === 'required' && (
            <p className='form__errorMessage'>This field is required</p>
          )}
        </div>
        <div>
          <label>Adress</label>
          <input
            type='text'
            {...register('address', { required: true, maxLength: 50 })}
          />
          {errors.address?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
          {errors.address?.type === 'maxLength' && (
            <p className='form__errorMessage'>Max length 50 characters.</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
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
          <label>Phone</label>
          <input
            type='number'
            {...register('phone', { required: true, maxLength: 13 })}
          />
          {errors.number?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
        </div>
        <div>
          <label>Age</label>
          <input
            type='number'
            {...register('age', {
              required: true,
              minLength: 1,
              validate: ageValidator
            })}
          />
          {errors.age?.type === 'required' && (
            <p className='form__errorMessage'>This field is required.</p>
          )}
          {errors.age?.type === 'validate' && (
            <p className='form__errorMessage'>Age must be above 18 and under 65</p>
          )}
        </div>
        <div>
          <label>Include gender?</label>
          <input type='checkbox' {...register('includeGender')} />
        </div>
        {includeGender && (
          <div>
            <label>Gender</label>
            <select {...register('gender', { required: true })}>
              <option value=''>Select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='non-binary'>Non-binary</option>
            </select>
            {errors.gender?.type === 'required' && (
              <p className='form__errorMessage'>This field is required.</p>
            )}
          </div>
        )}

        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

export default FormLogin
