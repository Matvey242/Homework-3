import { useState, useEffect } from 'react'
import axios from 'axios'
import notesStore from '../store/zustandStore.js'

const useNotes = () => {
	const notes = notesStore(state => state.notes)
    const AddNote = notesStore(state => state.AddNote)
	const upSeacrh = notesStore(state => state.upSeacrh)
	const downSeacrh = notesStore(state => state.downSeacrh)
	const DeleteNote = notesStore(state => state.DeleteNote)
	const rSearch = notesStore(state => state.rSearch)
	const fetchNotes = notesStore(state => state.fetchNotes)

	useEffect(() => {
    fetchNotes()
    }, [])

	const addNote = text => {
		const note = {
			text: text
		}
		AddNote(note)
		return note
	}

	const deleteNote = _id => {
		DeleteNote(_id)
	}

  const up = () => {
	upSeacrh()
  }

  const down = () => {
	downSeacrh()
  }

    const randomSearch = () => {
		rSearch()
  }


	return {
		notes,
		up,
		down,
		addNote,
		deleteNote,
		randomSearch
	}
}

export default useNotes
