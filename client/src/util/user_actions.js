import { useNavigate } from "react-router-dom"
import { setCookie, getCookie } from 'react-use-cookie'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user_atom'

export { useUserActions }

function useUserActions() {
    const [, setUser] = useRecoilState(userAtom)
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
                    setUser(res.data.user)
                    navigate('/')
                }
            }
        } catch (err) {
            console.error(err)
            logout()
        }
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max)
    }

    const logout = () => {
        // set token to zero
        setCookie('token', '0')
        setUser(0)
    }

    return { authSession, logout, getRandomInt }

}
