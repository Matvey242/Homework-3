import Task from "../model/TaskModel.js"

export const AddTask = async (req, res) => {
    try {
        const { text } = req.body
        const task = await Task.create({ text })
        return res.status(200).json({
            _id: task._id,
            text: text
        })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: `Ошибка сервера: ${err.message} `})
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        return res.json(tasks)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Ошибка при получении заметок: ${err.message}` })
    }
}