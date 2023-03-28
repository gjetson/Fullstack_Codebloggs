import '../css/userModal.css'

import React from 'react'
import { useState } from 'react'


function UserModal(props) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        props.onClose();
    };

    if (!isOpen) {
        return null;
    }

    const { user } = props;

    return (
        <div className="network-modal">
            <h1 className="network-modal-header">
                User Card
                <button className="close-button" onClick={handleClose}>
                    X
                </button>
            </h1>
            <div className="user-profile">
                <div className="profile-picture">JS</div>
                <div className="user-info">
                    <h2>John Smith</h2>
                    <p>Tampa</p>
                </div>
            </div>
            <hr className="divider" />
            <div className="user-status">
                <h3>Status</h3>
                <p>Placeholder for user status</p>
            </div>
            <hr className="divider" />
            <div className="latest-user-post">
                <h3>Latest Post</h3>
                <p>Placeholder for latest user post</p>
            </div>

        </div>
    );
}


export default UserModal