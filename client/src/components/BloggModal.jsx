import '../css/bloggModal.css'

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

    console.log(props.post)

    return (
        <div className="blogg-modal">
            <h3 className="blogg-modal-header">
                Blogg Post
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
            </h3>
            <div className="user-profile">
                <div className="profile-pic">{props.user.first_name.charAt(0).toUpperCase()}{props.user.last_name.charAt(0).toUpperCase()}</div>
                <div className="post-info">
                    <div className="current-user-post">
                        <p>{props.post.content}</p>
                    </div>
                    <div className="post-date">
                        <p>Date: {props.post.date}</p>
                    </div>
                </div>
            </div>
            <div className="like-section">
                <p>{props.post.likes} Likes</p>
                <div className="like-button">
                </div>
            </div>

            <div className="comment-section">
                <h5>Comments</h5>
                <p>{props.post.content}</p>
            </div>
        </div>
    )
}


export default BloggModal