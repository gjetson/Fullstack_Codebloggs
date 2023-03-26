import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useUserActions } from '../util/user_actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const appStyle = {
    height: '250px',
    display: 'flex'
}

const formStyle = {
    margin: 'auto',
    marginTop: '150px',
    padding: '25px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '600px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '25px',
    gridRowGap: '10px',
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
    display: 'block'
}

const RegisterSubmit = () => {
    const userActions = useUserActions()
    const navigate = useNavigate()

    useEffect(() => {
        userActions.authAltSession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const emailRef = React.useRef()
    const birthDateRef = React.useRef()
    const passwordRef = React.useRef()
    const confirmRef = React.useRef()
    const locationRef = React.useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            birthday: birthDateRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmRef.current.value,
            location: locationRef.current.value
        }
        register(data)
    }

    const clearForm = () => {
        firstNameRef.current.value = ''
        lastNameRef.current.value = ''
        emailRef.current.value = ''
        birthDateRef.current.value = ''
        passwordRef.current.value = ''
        confirmRef.current.value = ''
        locationRef.current.value = ''
    }

    const register = async (body) => {
        try {
            const res = await axios.post("http://localhost:3004/user", body)
            console.log(res.data)
            if (res && res.status === 201) {
                toast.success('User created. Please login.', { onClose: () => { navigate('/login') } })
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast.error(`Email: '${emailRef.current.value}' is NOT unique! Cannot create user. Try again.`, { onClose: clearForm })
            } else {
                console.error(error)
            }
        }
    }

    const Field = React.forwardRef(({ label, type }, ref) => {
        return (
            <div>
                <label style={labelStyle}>{label}</label>
                <input ref={ref} type={type} style={inputStyle} required />
            </div>
        )
    })

    return (
        <div style={appStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h1 style={{ marginTop: '5px' }}>Register</h1>
                <Field ref={locationRef} label="Location:" type="text" />
                <Field ref={firstNameRef} label="First Name:" type="text" />
                <Field ref={lastNameRef} label="Last Name:" type="text" />
                <Field ref={emailRef} label="Email:" type="email" />
                <Field ref={passwordRef} label="Password:" type="password" />
                <Field ref={birthDateRef} label="Birthdate:" type="date" />
                <Field ref={confirmRef} label="Confirm Password:" type="password" />
                <div>
                    <button style={submitStyle} type="submit">
                        Register
                    </button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    Already a Member?{' '}
                    <a href="/login">Login here</a>.
                </div>
            </form>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}

export default RegisterSubmit
