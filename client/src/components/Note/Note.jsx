import styles from './Note.module.css'

function Note({ note, children, onDoubleClick }) {
	console.log(note)
	return (
		<div key={note._id} className={styles.note} onDoubleClick={onDoubleClick}>
			{children}
			{note.text}
		</div>
	)
}

export default Note
