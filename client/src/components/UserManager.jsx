import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Confirm from './Confirm'
import axios from "axios"
import { getCookie } from 'react-use-cookie'
import { userAtom } from '../state/user'
import { useRecoilState } from 'recoil'

const User = (props) => (
    <tr>
        <td>{props.user.first_name}</td>
        <td>{props.user.last_name}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/user/${props.user._id}`}>Edit</Link>
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteUser(props.user._id)
                }}
            >
                Delete
            </button>
        </td>
    </tr>
)

export default function UserManager() {
    const [user,] = useRecoilState(userAtom)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.get(`http://localhost:3004/users`)
                console.log('users: ', res)
                if (res && res.status === 200) {
                    const updated = res.data.filter((el) => {
                        if (el._id !== user._id) {
                            return el
                        }
                    })
                    setUsers(updated)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getUsers()
        return
    }, [users.length])

    const confirmDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Confirm msg={'delete'} onClose={onClose} onConfirm={() => { deleteUser(id); onClose() }} />
                )
            }
        })
    }

    async function deleteUser(id) {
        try {
            const res = await axios.delete(`http://localhost:3004/user/delete/${id}`)
            console.log('users: ', res)
            if (res && res.status === 200) {
                toast.success('User deleted.', {
                    onClose: () => {
                        const filtered = users.filter((el) => el._id !== id)
                        setUsers(filtered)
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    function userList() {
        return users.map((el) => {
            return (
                <User
                    user={el}
                    deleteUser={() => confirmDelete(el._id)}
                    key={el._id}
                />
            )
        })
    }

    return (
        <div style={{ marginLeft: '250px' }}>
            <h3>User Manager</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th><Link className="btn btn-link" to={`/create/user`}>Create User</Link></th>
                    </tr>
                </thead>
                <tbody>{userList()}</tbody>
            </table>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}