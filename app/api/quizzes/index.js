const { Router } = require('express')

const { Quiz } = require('../../models')
const { Question } = require('../../models')

const router = new Router()
const QuestionsRouter = require('./questions')


router.get('/', (req, res) => {
  try {
    const data = []
    Quiz.get().forEach((quiz) => {
      data.push(
        {
          ...Quiz.getById(quiz.id),
          questions: Question.get().filter((question) => parseInt(question.quizId, 10) === quiz.id),
        },
      )
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json({
      ...Quiz.getById(req.params.quizId),
      questions: Question.get().filter((question) => question.quizId === req.params.quizId),
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.use('/:quizId/questions', QuestionsRouter)

module.exports = router
