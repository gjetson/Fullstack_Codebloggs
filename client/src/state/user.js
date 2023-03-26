import { atom } from 'recoil'

const userAtom = atom({
    key: 'userAtom',
    default: 0
})

export { userAtom }