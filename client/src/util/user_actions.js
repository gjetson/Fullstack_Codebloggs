import { useNavigate } from "react-router-dom"
import { setCookie, getCookie } from 'react-use-cookie'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { authAtom } from '../state/auth'
import { userAtom } from '../state/user'

export { useUserActions }

function useUserActions() {
    const [auth, setAuth] = useRecoilState(authAtom)
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    const authenticate = async (token) => {
        try {
            const res = await axios.post(`http://localhost:3004/session/authenticate/${token}`, {})
            console.log(res)
            if (res && res.status === 200) {
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }

    const authSession = async () => {
        const token = getCookie('token')
        if (!token || token === '0') {
            console.log('token: ', token)
            navigate('/login')
            return false
        } else if (!auth || auth !== token) {
            const valid = await authenticate(token)
            console.log('auth: ', valid)
            if (valid) {
                setAuth(token)
                return true
            } else {
                logout()
                return false
            }
        }
    }

    const authAltSession = async () => {
        const token = getCookie('token')
        if (token && token !== '0') {
            if (auth) {
                console.log('token: ', token)
                return navigate('/')
            } else {
                const valid = await authenticate(token)
                console.log('auth: ', valid)
                if (valid) {
                    setAuth(1)
                    return navigate('/')
                }
            }
        }
    }

    const initUser = async () => {
        const token = getCookie('token')
        if (token && token !== '0') {
            console.log('initUser')
            if (!user) {
                try {
                    const res = await axios.get(`http://localhost:3004/session/${token}`)
                    if (res && res.status === 200) {
                        console.log('setUser: ', res.data.user)
                        setUser(res.data.user)
                        return
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }

    const logout = () => {
        // set token to zero
        setCookie('token', '0')
        setAuth(0)
        setUser(0)
        navigate('/login')
    }

    return { authSession, authAltSession, initUser, logout }

}
