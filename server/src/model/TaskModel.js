import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  text: { type: String, required: true }
})

const Task = new mongoose.model('Task', TaskSchema)

export default Task