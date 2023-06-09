import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useRecoilState } from 'recoil'
import { useUserActions } from '../util/user_actions'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useCookie from 'react-use-cookie'
import { userAtom } from '../state/user_atom'

const appStyle = {
  height: '250px',
  display: 'flex'
}

const formStyle = {
  margin: 'auto',
  marginTop: '200px',
  padding: '20px',
  border: '1px solid #c9c9c9',
  borderRadius: '5px',
  background: '#f5f5f5',
  width: '350px',
  display: 'block'
}

const labelStyle = {
  margin: '10px 0 5px 0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px',
}

const inputStyle = {
  margin: '5px 0 10px 0',
  padding: '5px',
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  boxSizing: 'border-box',
  width: '100%'
}

const submitStyle = {
  margin: '10px 0 0 0',
  padding: '7px 10px',
  border: '1px solid #efffff',
  borderRadius: '3px',
  background: '#8d88ea',
  width: '100%',
  fontSize: '15px',
  color: 'white',
  display: 'block',
  cursor: 'pointer'
}

function Login() {
  const [, setUserToken] = useCookie('token', '0')
  const [, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()
  const userActions = useUserActions()

  useEffect(() => {
    userActions.authSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    login(data)
  }

  const login = async (data) => {
    try {
      const res = await axios.post(`http://localhost:3004/user/login`, data)
      console.log(res)
      if (res && res.status === 201) {
        console.log('token: ', res.data.session.token)
        setUserToken(res.data.session.token, { days: 1 })
        setUser(res.data.user)
        return navigate('/')
      }
    } catch (err) {
      console.error(err)
      toast.error('Email or password is invalid!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const Field = React.forwardRef(({ label, type }, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} required />
      </div>
    )
  })

  return (

    <div style={appStyle}>
      <form style={formStyle} onSubmit={handleSubmit} >
        <h1 style={{ marginTop: '5px' }}>Login</h1>
        <Field ref={emailRef} label="Email:" type="email" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit" >Login</button>
        </div>
        <div style={{ marginTop: '10px' }}>
          Not a Member?{' '}
          <a href="/register">Register here</a>.
        </div>
      </form>
      <ToastContainer
        position="top-center"
        theme="colored"
      />
    </div>

  )
}
export default Login
