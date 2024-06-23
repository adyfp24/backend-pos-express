const orderService = require("../services/order-service");
const { successResponse, clientErrorResponse, errorResponse,
    createdResponse, notFoundResponse } = require('../middlewares/response');
const fs = require('fs');
const path = require('path');

const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const newOrder = await orderService.createOrder(products);
        if (newOrder) {
            return createdResponse(res, newOrder, 'pesanan berhasil diproses')
        } else {
            return clientErrorResponse(res, 'pesanan gagal diproses, silahkan coba lagi')
        }
    } catch (error) {
        return errorResponse(res, error);
    }
};

const exportStruct = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const uangMasuk = req.body.uang_masuk;
        const struct = await orderService.exportStruck(transactionId, uangMasuk);
        if (struct) {
            const fileName = `receipt_${transactionId}.pdf`;
            const filePath = path.join(__dirname, '..', '..', 'public', 'receipts', fileName);
            fs.writeFileSync(filePath, struct);
            res.download(filePath, fileName, (err) => {
                if (err) {
                    return errorResponse(res, err);
                } else {
                    console.log('struct berhasil diunduh');
                }
            });
        } else {
            return clientErrorResponse(res, 'struk gagal dicetak, silahkan coba lagi');
        }
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    createOrder,
    exportStruct
};