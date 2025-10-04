# Приложение для заметок

## Введение

Рассмотрим приложение для заметок, которое будет использоваться для демонстрации различных аспектов React.

- Создание переиспользуемых компонентов с помощью `children`
- Управление фокусом и DOM-элементами с помощью `useRef()`
- Передача данных через все кмопоненты с помощью `useContext()`
- Создание собственных хуков

## Использование `children`

`children` - это специальный `prop`, который передаётся каждому компоненту. В него попадает всё, что вы помещаете между открывающим и закрывающим тегами этого компонента. Данный инструмент отлично подходит для создания компонентов-обёрток, layout-компонентов и т.д.

_Пример использования:_

```jsx
// components/Card.jsx
import './Card.css'

const Card = ({ children, className }) => {
	// Объединяем класс 'card' с любыми переданными классами
	const classes = `card ${className || ''}`
	return <div className={classes}>{children}</div>
}

export default Card
```

```jsx
// App.jsx
import Card from './components/Card'

function App() {
	return (
		<div className='app'>
			<Card>
				<h2>Моя первая заметка!</h2>
				<p>Это содержимое будет передано как `children`</p>
			</Card>
		</div>
	)
}
```

В данном примере компонент `Card` не знает заранее, что в него положат. Он просто рендерит то, что получает "снаружи", в определенной стилевой обертке.

## Использование `useRef()`

`useRef()` - возвращает нам изменяемый объект, свойство `.current` которого мы можем инициализировать и потом перезаписывать.

У этого хука два основных применения:

1. **Хранение изменяемых значений**, которые не триггерят ререндер при обновлении (как например `useState()`)
2. **Прямой доступ к DOM-элементам** (например, получить ссылку на `input`, чтобы управлять фокусом или значением)

_Пример использования:_

```jsx
// components/NoteForm.jsx
import { useRef } from 'react'

const NoteForm = ({ onAddNote }) => {
	const inputRef = useRef(null) // 1. Создаем ref

	const handleSubmit = e => {
		e.preventDefault()
		const enteredValue = inputRef.current.value // 2. Достаем значение из DOM

		if (enteredValue.trim()) {
			onAddNote(enteredValue)
			inputRef.current.value = '' // 3. Очищаем input через ref
		} else {
			inputRef.current.focus() // 4. Возвращаем фокус на инпут, если поле пустое
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Новая заметка...'
				ref={inputRef} // 5. Привязываем ref к DOM-элементу
			/>
			<button type='submit'>Добавить</button>
		</form>
	)
}

export default NoteForm
```

Мы использовали `useRef` для прямого доступа к инпуту, чтобы получить его значение и очистить его, не управляя его состоянием через `useState`, а также для управления фокусом. Это позволяет нам управлять DOM-элементами более гибко и эффективно.

## Использование `useContext()`

Проброс `props` через десяток компонентов (prop drilling) может быть утомительным и неэфективным. В этом случае мы можем использовать `useContext()`. Он позволяет подписаться на контекст и читать его значение из любого компонента в дереве, не передавая props явно на каждом уровне.

### Когда использовать контекст, а когда стейт-менеджер ?

1. Используйте useContext для:

- Передачи глобальных, редко меняющихся данных (язык, тема).
- Передачи несериализуемых экземпляров (сокеты, инстансы API, сервисы).
- Передачи функций-хелперов (например, `useAuth` для доступа к методам аутентификации).
- Локализации проблемы "prop drilling" в большой ветке компонентов.

2. Используйте стейт-менеджер для:

- Управления серверным состоянием (данные с API, кэширование, загрузки, ошибки).
- Управления сложным клиентским состоянием, которое часто меняется и используется в разных, несвязанных частях приложения (модалки, данные форм, кеш данных, глобальные фильтры).
- Когда важна производительность и нужно избегать лишних перерендеров.
- Когда нужны продвинутые инструменты для отладки (логи действий, "машина времени").

### Разбор примера с изменением темы приложения через `useContext`

1. Создадим контекст для темы:

```jsx
// context/ThemeContext.jsx
import { createContext, useState, useContext } from 'react'

// 1. Создаем контекст с default-значением
const ThemeContext = createContext({
	isDarkMode: false,
	toggleTheme: () => {}
})

// 2. Создаем Provider component
export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleTheme = () => {
		setIsDarkMode(prevMode => !prevMode)
	}

	// 3. Значение, которое будет доступно всем подписчикам
	const value = {
		isDarkMode,
		toggleTheme
	}

	return (
		<ThemeContext.Provider value={value}>
			{/* 4. Оборачиваем всё приложение в этот провайдер */}
			{children}
		</ThemeContext.Provider>
	)
}

// 5. Создаем кастомный хук для удобства использования
export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
```

2. Обновляем index.css: Задаем CSS-переменные для тем.

```css
/* index.css */
:root {
	--bg-color-primary: #ffffff;
	--bg-color-secondary: #f5f5f5;
	--text-color: #333333;
}

.dark {
	--bg-color-primary: #333333;
	--bg-color-secondary: #555555;
	--text-color: #ffffff;
}

body {
	background-color: var(--bg-color-primary);
	color: var(--text-color);
	transition: background-color 0.3s, color 0.3s;
}
```

3. Обновляем main.jsx / index.js: Оборачиваем приложение в провайдер.

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		// Теперь тема доступна всему приложению
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
```

4. Создаём компонент для переключения темы: Используем наш контекст

```jsx
// components/ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useTheme() // Подписываемся на контекст

	return (
		<button onClick={toggleTheme}>
			Переключить на {isDarkMode ? 'светлую' : 'темную'} тему
		</button>
	)
}

export default ThemeToggle
```

5. Обновляем `App.jsx`: Добавляем переключатель и логику для класса `.dark`.

```jsx
// App.jsx
import { useTheme } from './context/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import NoteForm from './components/NoteForm'
import Card from './components/Card'
import './App.css'

function App() {
	const { isDarkMode } = useTheme() // Получаем текущую тему

	return (
		// Динамически добавляем класс к корневому элементу
		<div className={`app ${isDarkMode ? 'dark' : ''}`}>
			<ThemeToggle />
			<NoteForm onAddNote={text => console.log('Добавляем:', text)} />
			<Card>
				<h2>Заметка 1</h2>
				<p>Это пример заметки</p>
			</Card>
		</div>
	)
}

export default App
```

Таким образом мы создали глобальное состояние темы, к которому может получить доступ любой компонент без проброса props. Изменение темы автоматически применяется ко всему приложению через CSS-переменные.

## Кастомные хуки

**Кастомный хук** — это просто JavaScript-функция, имя которой начинается с use и которая может внутри себя вызывать другие хуки. Это способ извлечения и повторного использования логики состояния между компонентами.

### Разбор примера вынесения логики создания заметок в отдельный хук

```jsx
// hooks/useNotes.js
import { useState } from 'react'

const useNotes = (initialNotes = []) => {
	const [notes, setNotes] = useState(initialNotes)

	const addNote = text => {
		const newNote = {
			id: Math.random().toString(36).substr(2, 9),
			text: text
		}
		setNotes(prevNotes => [...prevNotes, newNote])
	}

	const deleteNote = id => {
		setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
	}

	// Возвращаем состояние и методы для работы с ним
	return {
		notes,
		addNote,
		deleteNote
	}
}

export default useNotes
```

Теперь мы можем обновить компонент `App`, используя наш кастомный хук:

```jsx
// App.jsx
import { useTheme } from './context/ThemeContext'
import useNotes from './hooks/useNotes' // Импортируем кастомный хук
import ThemeToggle from './components/ThemeToggle'
import NoteForm from './components/NoteForm'
import Card from './components/Card'

function App() {
	const { isDarkMode } = useTheme()
	const { notes, addNote, deleteNote } = useNotes() // Используем его

	return (
		<div className={`app ${isDarkMode ? 'dark' : ''}`}>
			<ThemeToggle />
			<NoteForm onAddNote={addNote} /> {/* Передаем addNote из хука */}
			{notes.map(note => (
				<Card key={note.id}>
					<h2>Заметка</h2>
					<p>{note.text}</p>
					<button onClick={() => deleteNote(note.id)}>Удалить</button>
				</Card>
			))}
		</div>
	)
}

export default App
```

Мы вынесли логику состояния в отдельную функцию, сделав компонент `App` более чистым и декларативным. Эту логику теперь можно легко переиспользовать в других компонентах.

## Правила хуков

**Хуки** — не обычные функции, у них есть строгие правила, которые нельзя нарушать:

1. Вызывайте хуки только на верхнем уровне. Нельзя вызывать их внутри циклов, условий или вложенных функций. Почему? React полагается на порядок вызова хуков для сопоставления состояния между рендерами.

   - Можно:

   ```jsx
   const [state, setState] = useState()
   useEffect(() => {})
   if (condition) {
   	// какая-то логика, но НЕ вызов хуков
   }
   ```

   - Нельзя:

   ```jsx
   if (condition) {
   	useState(); // ❌
   }
   for (...) {
   	useEffect(); // ❌
   }
   const nestedFunc = () => {
   	useContext(); // ❌
   };
   ```

2. Вызывайте хуки только из React-функций. Не вызывайте их из обычных JavaScript-функций. Вызывайте их только из функциональных компонентов или из кастомных хуков.

Мы не нарушали эти правила ни в одном из наших примеров. Все хуки (`useState`, `useRef`, `useContext`, `useNotes`) всегда вызывались на верхнем уровне наших компонентов и кастомного хука.

## Заключение

1. `children` - это специальное свойство, которое передается в компоненты и используется для отображения дочерних элементов.
2. `useRef` - хук, который используется для прямого доступа к DOM и хранения мутабельных значений.
3. `useContext` - хук для глобального управления состоянием (темой) без prop drilling.
4. Кастомные хуки используются для переиспользования логики между компонентами.
5. Правила хуков:
   - Хуки начинаются с `use`.
   - Вызывайте хуки только на верхнем уровне.
   - Вызывайте хуки только из React-функций.
