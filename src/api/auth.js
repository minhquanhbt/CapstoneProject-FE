import instance from './axios'
//get all product v1
export const getCards1 = async () => instance.get('/v1/getMainInfo')
//Sign in
export const login = async (argument) => instance.post('/login', argument)