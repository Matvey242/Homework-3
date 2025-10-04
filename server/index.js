import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import taskRouter from './src/routes/taskRoutes.js'
import mailRouter from './src/routes/mailRoutes.js'
import cors from 'cors'

dotenv.config()

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.log(err)
	})

    
const app = express()
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

app.use(morgan('dev'))
app.use(express.json())
app.use('/tasks', taskRouter)
app.use('/mail', mailRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`server is running on port ${port}`)
})