import Note from '../Note/Note'
import styles from './Notes.module.css'

function Notes({ notes, deleteNote }) {
	return (
		<div className={styles.container}>
			{notes.map(note => (
               <Note
                 key={note._id}
                 note={note}
                 onDoubleClick={() => deleteNote(note._id)} // передаём конкретную функцию для удаления
               >
               {/* children */}
              </Note>
))}
		</div>
	)
}

export default Notes
