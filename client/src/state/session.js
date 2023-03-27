import { atom } from 'recoil'

const sessionAtom = atom({
    key: 'sessionAtom',
    default: 0
})

export { sessionAtom }