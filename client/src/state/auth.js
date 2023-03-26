import { atom } from 'recoil'

const authAtom = atom({
    key: 'authAtom',
    default: 0
})

export { authAtom }