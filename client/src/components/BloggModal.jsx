
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../css/bloggModal.css'

function BloggModal(props) {
    const [isOpen, setIsOpen] = useState(true)
    const likesRef = React.useRef()

    const handleClose = () => {
        setIsOpen(false)
        props.onClose()
    }

    if (!isOpen) {
        return null
    }

    const handleLikesClick = async () => {
        try {
            const res = await axios.post(`http://localhost:3004/post/like/${props.post._id}`)
            console.log(res)
            likesRef.current.innerText = `${res.data.likes} Likes`
            props.updateLikes(props.index, res.data.likes)
            if (res && res.status === 200) {
                return res.data
            }
        } catch (err) {
            console.error(err)
        }
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
                <p ref={likesRef}>{props.post.likes} Likes</p>
                <div className="like-button" onClick={handleLikesClick}>
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