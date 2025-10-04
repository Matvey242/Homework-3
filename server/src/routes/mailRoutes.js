import express from 'express'
import { EmailSend } from '../mail/sendEmail.js'

const router = express.Router()

router.post('/send-email', EmailSend)

export default router