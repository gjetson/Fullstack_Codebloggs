import { atom } from 'recoil'
import { getCookie } from 'react-use-cookie'
import axios from 'axios'


const init = async () => {
    const token = getCookie('token')
    if (token && token !== 0) {
        try {
            const res = await axios.get(`http://localhost:3004/session/${token}`)
            console.log(res)
            if (res && res.status === 200) {
                console.log(res.data)
                return res.data.session.user
            }
            return {}
        } catch (err) {
            console.error(err)
        }
    }
}

const userAtom = atom({
    key: 'userAtom',
    default: { init }
})


export { userAtom }