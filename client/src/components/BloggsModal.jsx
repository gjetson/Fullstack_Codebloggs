import '../css/userModal.css'

import React from 'react'
import { useState } from 'react'


function BloggModal(props) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        props.onClose()
    }

    if (!isOpen) {
        return null
    }

    console.log('props: ', props)

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
                    <h2>{props.blogg.user.first_name} {props.blogg.user.last_name}</h2>
                    <p>{props.blogg.user.location}</p>
                </div>
            </div>
        </div>
    )
}


export default BloggModal