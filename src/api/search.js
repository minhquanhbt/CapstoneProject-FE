import instance from './axios'

//search
export const search = async (argument) => instance.post('/v1/search',argument)