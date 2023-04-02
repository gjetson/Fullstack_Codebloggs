import { atom } from 'recoil'

const userBloggsAtom = atom({
    key: 'userBloggsAtom',
    default: 0
})

export { userBloggsAtom }