const orderService = require("../services/order-service");
const { successResponse, clientErrorResponse, errorResponse, 
    createdResponse, notFoundResponse } = require('../middlewares/response');

const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const newOrder = await orderService.createOrder(products);
        if(newOrder){
            return createdResponse(res, newOrder, 'pesanan berhasil diproses')
        }else{
            return clientErrorResponse(res, 'pesanan gagal diproses')
        }
    } catch (error) {
        return errorResponse(res, error);
    }
};

const exportStruct = async () => {

};

module.exports = {
    createOrder,
    exportStruct
};