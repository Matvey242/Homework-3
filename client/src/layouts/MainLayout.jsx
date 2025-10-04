import NoteForm from '../components/NoteForm/NoteForm'
import Notes from '../components/Notes/Notes.jsx'
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.jsx'
import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import { IoIosMail } from "react-icons/io"
import useNotes from '../hooks/useNotes.js'
import styles from './MainLayout.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MainLayout() {
	const { notes, addNote, deleteNote, up, down, randomSearch } = useNotes()
	const [searchText, setSearchText] = useState('')

	const searchedNotes = notes.filter(note => (
		note.text.toLowerCase().includes(searchText.toLowerCase())
	))

	 const sendMail = async () => {
        const result = await axios.post('http://localhost:3000/mail/send-email')
        return result.data
    }
	return (
		<div className={styles.container}>
			<ThemeToggle />
			<div className={styles.header}>
				<FaArrowDown onClick={down} className={styles.icon} />
				<FaArrowUp onClick={up} className={styles.icon} />
				<FaArrowRightArrowLeft onClick={randomSearch} className={styles.icon} />
				<IoIosMail onClick={sendMail} className={styles.icon} />
			</div>
			<div className={styles.searchBlock}>
				<input value={searchText} onChange={(event) => setSearchText(event.target.value)}  placeholder='Search...' className={styles.searchbar}></input>
			</div>
			<div className={styles.line}></div>
			<Notes notes={searchedNotes} deleteNote={(_id) => deleteNote(_id)} />
			<NoteForm onAddNote={addNote} />
		</div>
	)
}

export default MainLayout
