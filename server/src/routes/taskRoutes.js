import express from 'express'
import { AddTask, getAllTasks } from '../taskFunc/taskFunc.js'

const router = express.Router()

router.post('/', AddTask)
router.get('/getTask', getAllTasks)

export default router