import { create } from "zustand"


// const fetchUser = async () => {

// }

// const fetchSession = async () => {

// }

const sessionStore = ((set, get) => (
    {
        token: '',
        timestamp: 0,
        clear: () => set(() => ({ token: '', timestamp: 0 })),
        fetchSession: {}
    }
))

const userStore = ((set) => (
    {
        user: {},
        fetchPokemon: async () => {
            await fetch('https://pokeapi.co/api/v2/pokemon')
                .then(response => response.json())
                .then(data => set({ pokemon: data.results }))
        }
    }
))

const useSessionStore = create(sessionStore)
const useUserStore = create(userStore)

export { useSessionStore, useUserStore }