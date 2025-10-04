import dotenv from 'dotenv'
import { sendEmail } from './mailer.js'
import Task from '../model/TaskModel.js'

dotenv.config()

export const EmailSend =  async (req, res) => {
  try {  
    const tasks = await Task.find()
    const taskList = tasks.map(task => 
      `<li>${task.text}</li>`
    ).join('')

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Новое письмо',
      html: `
        <p>Список заметок</p> 
        <ul>
          ${taskList}
        </ul>
      `
    }

    await sendEmail(mailOptions)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}