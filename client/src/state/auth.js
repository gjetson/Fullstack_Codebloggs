import { atom } from 'recoil'
import { getCookie } from 'react-use-cookie'

const authAtom = atom({
    key: 'authAtom',
    // get initial state from local storage to enable user to stay logged in
    default: getCookie('token')
})

export { authAtom }