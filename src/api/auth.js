import instance from './axios'
//Sign in
export const login = async (argument) => instance.post('/login', argument)
//Sign up
export const register = async (argument) => instance.post('/register', argument)
//Accepted
export const accepted = async (argument) => instance.post('/accepted', argument)