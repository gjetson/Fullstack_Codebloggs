import { useNavigate } from "react-router-dom"
import { setCookie, getCookie } from 'react-use-cookie'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { sessionAtom } from '../state/session'

export { useUserActions }

function useUserActions() {
    const [, setSession] = useRecoilState(sessionAtom)
    const navigate = useNavigate()

    const authSession = async () => {
        try {
            console.log('authSession')
            const token = getCookie('token')
            if (token && token === '0') {
                logout()
            } else {
                const res = await axios.get(`http://localhost:3004/session/${token}`)
                console.log(res)
                if (res.status === 200) {
                    console.log('data: ', res.data)
                    let sesh = res.data.user
                    sesh.token = res.data.token
                    console.log('sesh: ', sesh)
                    setSession(sesh)
                    navigate('/')
                }
            }
        } catch (err) {
            console.error(err)
            logout()
        }
    }

    const logout = () => {
        // set token to zero
        setCookie('token', '0')
        setSession(0)
    }

    return { authSession, logout }

}
