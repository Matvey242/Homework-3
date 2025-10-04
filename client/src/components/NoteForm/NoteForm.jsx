import { useRef, useState } from 'react'
import styles from './NoteForm.module.css'
import { OnChangeCount } from '../../utils/utils.js'
import axios from 'axios'

function NoteForm({ onAddNote }) {
	const [count, setCount] = useState(0)
	const inputRef = useRef()

	
   const handleSubmit = async e => {
     e.preventDefault()
     const enteredValue = inputRef.current.value.trim()
     if (enteredValue) {
       try {
         const response = await axios.post('http://localhost:3000/tasks', { text: enteredValue })
         onAddNote(response.data)
         inputRef.current.value = ''
         inputRef.current.focus()
        setCount(0)
       } catch (error) {
         alert('Ошибка при добавлении заметки')
         console.error(error)
       }
     } else {
       alert('Please enter a valid note')
       inputRef.current.focus()
     }
   }


	const changeCount = event => {
		OnChangeCount(event, setCount)
	}

	const handleReset = e => {
		e.preventDefault()
		inputRef.current.value = ''
		inputRef.current.focus()
		setCount(0)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
			<div className={styles["topPart"]}>
			<input placeholder='New note...' ref={inputRef} type='text' onChange={changeCount} maxLength={250} />
			<button type='submit'>+</button>
			<button type='reset'>-</button>
			</div>
			<div className={styles["bottomPart"]}>
			<span>[{count}/250]</span>
			</div>
		</form>
	)
}

export default NoteForm
