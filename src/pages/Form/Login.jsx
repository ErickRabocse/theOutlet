// import React from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './form.scss'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)

    // const axios = require('axios')
    // const data = JSON.stringify({
    //   email: 'superman@dc.com',
    //   password: 'superman'
    // })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://theoutlet.onrender.com/login',
      headers: {
        'Content-Type': 'application/json'
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmNTQ1MzkwLWZkOGYtNDQxMi1iN2IzLTRlMjY3NTg2NzUxZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5MjY3MzM1NX0.wZace60PFzcNe6ScnF2AZjCBorpwwL1Ym5W0h1UyTBw'
      },
      data: JSON.stringify(data)
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='form'>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

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
