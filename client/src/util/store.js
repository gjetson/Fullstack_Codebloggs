import { create } from "zustand"


// const fetchUser = async () => {

// }

// const fetchSession = async () => {

// }

const useStore = create((set) => ({
    session: 'React',
    setSession: (session) => set({ session }),
}))


export { useStore }