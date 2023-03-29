import React, { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import axios from "axios"
import "../css/bloggs.css"
import BloggModal from "./BloggsModal"


export default function Blogg({ props }) {
    const handleCardHover = (userId) => {
        const card = document.getElementById(`user-${userId}`)
        if (card) {
            card.style.boxShadow = '0 0 5px 2px gray'
            card.onmouseleave = () => {
                card.style.boxShadow = 'none'
            }
        }
    }

    const handleCardClick = async () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', props.blogg.post)
                console.log('user: ', props.blogg.user)
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <BloggModal onClose={onClose} user={props.blogg.user} post={props.blogg.post} />
                )
            }
        })
    }

    return (
        <div
            className="card"
            onClick={handleCardClick}
            onMouseEnter={() => handleCardHover(props.blogg.user._id)}
            id={`user-${props.blogg.user._id}`}
        >
            <div className="card-content">
                <p className="content">{props.blogg.content}</p>
                <p className="likes">&hearts; {props.blogg.likes}</p>
                <p className="userId">
                    User: {props.blogg.user.first_name} {props.blogg.user.last_name}
                </p>
            </div>
        </div>
    )
}
