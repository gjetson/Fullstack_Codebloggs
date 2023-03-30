import React, { useEffect, useState } from "react"
import "react-confirm-alert/src/react-confirm-alert.css"
import axios from "axios"
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user'

const Blogg = (props) => (
    <tr>
        <td>{props.blogg.content}</td>
        <td>{props.blogg.likes}</td>
        <td>{props.blogg.user}</td>
    </tr>
)

export default function UserBloggs() {
    const [user,] = useRecoilState(userAtom)
    const [bloggs, setBloggs] = useState([])


    useEffect(() => {
        async function getBloggs() {
            try {
                const res = await axios.get(`http://localhost:3004/posts/${user._id}`)
                console.log('bloggs: ', res)
                if (res && res.status === 200) {
                    setBloggs(res.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getBloggs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bloggs.length])


    function bloggList() {
        return bloggs.map((blogg) => {
            console.log('user: ', blogg.user)
            return (
                <Blogg
                    blogg={blogg}
                    key={blogg._id}
                />
            )
        })
    }

    return (
        <div style={{ marginLeft: '250px' }}>
            <h1>Bloggzilla Phone Home</h1>
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Content</th>
                            <th>Likes</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>{bloggList()}</tbody>
                </table>
            </div>
        </div>
    )
}