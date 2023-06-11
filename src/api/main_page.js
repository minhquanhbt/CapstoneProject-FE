import instance from './axios'
//get all product v1
export const getCards1 = async () => instance.get('/v1/getMainInfo')
//get all product v2
export const listProductV2 = async () => instance.get('/v2/getAllProduct')
//get product detail v1
export const productDetail = async (argument) => instance.post('/v1/getDetailProduct', argument)
//get product detail v2
export const productDetail2 = async (argument) => instance.post('/v2/getDetailProduct', argument)
//get review
export const getReview = async (argument) => instance.post('/v1/getReviewProduct',argument)
//payment
export const payment = async (argument) => instance.post('/v2/order',argument)
//review
export const sendReview = async (argument) => instance.post('/v1/review',argument)
//order history
export const orderHistory = async (argument) => instance.post('/v1/getHistoryOrder',argument)
//detail order history
export const detailOrder = async (argument) => instance.post('/v1/getDetailOrder',argument)