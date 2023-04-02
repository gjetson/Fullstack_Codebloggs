import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Confirm from './Confirm'
import { getCookie } from 'react-use-cookie'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function EditUser() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        users: [],
    })
    const params = useParams()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3004/user/${params.id}`)
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`
                window.alert(message)
            }
            const agent = await response.json()
            if (!agent) {
                console.error(`Agent with id ${params.id} not found`)
            }
            setForm(agent)
            return
        }
        fetchData()
        return
    }, [params.id])

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editUser(); onClose() }} />
                )
            }
        })
    }

    const editUser = async () => {
        const body = {
            first_name: form.first_name,
            last_name: form.last_name,
        }
        console.log('body: ', body)
        try {
            const res = await axios.post(`http://localhost:3004/user/update/${params.id}`, body)
            console.log(res)
            if (res && res.status === 201) {
                toast.success('User updated.', {
                    onClose: () => {
                        navigate('/users')
                    }
                })
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div style={{ marginLeft: '250px' }}>
            <h3>Update Agent</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={form.first_name}
                        onChange={(e) => updateForm({ first_name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={form.last_name}
                        onChange={(e) => updateForm({ last_name: e.target.value })}
                        required
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update User"
                        className="btn btn-primary"
                    />
                </div>
            </form>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}