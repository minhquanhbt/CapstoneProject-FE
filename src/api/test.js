import instance from './axios'
//get test
export const getTest = async (argument) => instance.get('/test', argument)
//send test answer
export const sendTestResult = async (argument) => instance.post('/test-answer', argument)
//get exam
export const getExam = async (argument) => instance.get(`/exam/${argument}`)
//send exam answer
export const sendExamResult = async (argument) => instance.post('/exam-answer', argument)