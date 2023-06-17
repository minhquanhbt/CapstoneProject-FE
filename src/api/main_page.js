import instance from './axios'
//get all product v1
export const getLogedMainData = async () => instance.get('/v1/getMainLogedInfo')
//get all product v1
export const getMainData = async () => instance.get('/v1/getMainInfo')