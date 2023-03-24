
import useCookie from 'react-use-cookie'
import axios from 'axios'
import { history } from './history'


export { useUserActions }

function useUserActions() {

    const [userToken, setUserToken] = useCookie('token', '0')

    const login = async (username, password) => {
        try {
            const res = await axios.post(`http://localhost:3004/user/login`, { username, password })
            if (res && res.ok) {
                console.log(res.data)
                setUserToken(res.data.session.token)

                // update zustand with session and user

                return res.data
            }
            return {}
        } catch (err) {
            console.error(err)
        }
    }

    const authSession = async (token) => {
        try {
            const res = await axios.post(`http://localhost:3004/session/authenticate/${token}`, {})
            if (res && res.ok) {
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        // set token to zero
        setUserToken('0')

        //Clear zustand session and user

        history.push('/login')
    }

    return { login, authSession, logout }

}
