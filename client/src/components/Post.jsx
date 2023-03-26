import '../css/confirm.css'

import React from 'react'
import { useState } from 'react'


function Post(props) {
    const [post, setPost] = useState("")

    const handleClick = () => {
        props.onConfirm(post)
    }

    return (
        <div className="custom-confirm">
            <h1>Say something...</h1>
            <textarea className="userInput" onChange={(e) => setPost(e.target.value)}></textarea>
            <button onClick={props.onClose}>Cancel</button>
            <button onClick={handleClick}>Post it!</button>
        </div>
    )
}

export default Post

// calling code example...
//
// function onSubmit(e) {
//     e.preventDefault()
//     confirmAlert({
//         customUI: ({ onClose }) => {

//             return (
//                 // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />

//                 <Post onClose={onClose} onConfirm={(msg) => { sendPost(msg); onClose() }} />
//             )
//         }
//     })
// }

// const sendPost = (msg) => {
//     console.log(msg)
// }