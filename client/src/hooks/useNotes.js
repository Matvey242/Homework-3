import { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = (initialNotes = []) => {
	const [notes, setNotes] = useState(initialNotes)

	useEffect(() => {
		const getTasks = async () => {
			const result = await axios.get('http://localhost:3000/tasks/getTask')
			setNotes(result.data)
		}
		getTasks()
	}, [])

	const addNote = text => {
		const note = {
			text: text
		}
		setNotes(prevNotes => [...prevNotes, note])
		return note
	}

	const deleteNote = _id => {
		setNotes(prevNotes => prevNotes.filter(note => note._id !== _id))
	}

  const up = () => {
    const sorted = [...notes].sort((a, b) => a.text.localeCompare(b.text))
    setNotes(sorted)
  }

  const down = () => {
    const sorted = [...notes].sort((a, b) => b.text.localeCompare(a.text))
    setNotes(sorted)
  }

  const randomSearch = () => {
	const sorted = [...notes].sort(() => Math.random() - 0.5)
	setNotes(sorted)
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
