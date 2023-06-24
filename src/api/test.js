import instance from './axios'
//get test
export const getTest = async (argument) => instance.get('/test', argument)
//send test answer
export const sendTestResult = async (argument) => instance.post('/test-answer', argument)