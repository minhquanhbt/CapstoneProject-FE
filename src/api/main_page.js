import instance from './axios'
//get all product v1
export const getLogedMainData = async () => instance.get('/v1/getMainLogedInfo')
//get all product v1
export const getMainData = async () => instance.get('/v1/getMainInfo')
//get quiz v1
export const getQuiz = async () => instance.get('/v1/quiz')
//send answer quiz v1
export const sendAnswer = async (argument) => instance.post('/v1/quiz-answer', argument)