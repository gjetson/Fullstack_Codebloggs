
import useCookie from 'react-use-cookie'
import axios from 'axios'
import { history } from './history'

export { useUserActions }

function useUserActions() {

    const [userToken, setUserToken] = useCookie('token', '0')

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
