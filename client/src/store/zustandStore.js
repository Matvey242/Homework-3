import {create} from 'zustand'
import axios from 'axios'

const notesStore = create(set => ({
    notes: [],

    AddNote: (note) => set(state => ({
        notes: [...state.notes, note]
    })),

    DeleteNote: (_id) => set(state => ({
        notes: state.notes.filter(note => note._id !== _id)
    })),

    upSeacrh: () => set(state => ({
        notes: [...state.notes].sort((a, b) => a.text.localeCompare(b.text))
    })),

    downSeacrh: () => set(state => ({
        notes: [...state.notes].sort((a, b) => b.text.localeCompare(a.text))
    })),

    rSearch: () => set(state => ({
        notes: [...state.notes].sort(() => Math.random() - 0.5)
    })),

    fetchNotes: async () => {
        try {
            const result = await axios.get('http://localhost:3000/tasks/getTask')
            set({ notes: result.data })
        } catch (err) {
            console.log('Ошибка получения заметок на клицнте:', err)
        }
    }
}))

export default notesStore