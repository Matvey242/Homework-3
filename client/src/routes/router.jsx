import { createBrowserRouter } from 'react-router-dom'
import Notes from '../components/Notes/Notes.jsx'
import MainLayout from '../layouts/MainLayout.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Notes />
			}
		]
	}
])

export default router
