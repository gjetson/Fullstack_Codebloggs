import '../css/userModal.css'

import React from 'react'
import { useState } from 'react'


function UserModal(props) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        props.onClose()
    }

    if (!isOpen) {
        return null
    }

    console.log(props.post)

    return (
        <div className="network-modal">
            <h1 className="network-modal-header">
                User Card
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
            </h1>
            <div className="user-profile">
                <div className="profile-picture">JS</div>
                <div className="user-info">
                    <h2>{props.user.first_name} {props.user.last_name}</h2>
                    <p>{props.user.location}</p>
                </div>
            </div>
            <hr className="divider" />
            <div className="user-status">
                <h3>Status</h3>
                <p>{props.user.status}</p>
            </div>
            <hr className="divider" />
            <div className="latest-user-post">
                <h3>Latest Post</h3>
                <p>{props.post.content}</p>
            </div>

        </div>
    )
}


export default UserModal