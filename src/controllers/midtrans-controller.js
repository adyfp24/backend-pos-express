const midtransService = require("../services/midtrans-service");

const createSnap = async (req, res) => {
    try {
        const {
            transaction_details,
            item_details,
            customer_details
        } = req.body;
        const transactionData = { transaction_details, item_details, customer_details };
        const snapToken = await midtransService.createSnap(transactionData);
        if (snapToken) {
            return res.status(200).json({
                "success": true,
                "message": "token berhasil didapat",
                "data": {
                    "snap_token": snapToken
                }
            })
        }else{
            return res.status(404).json({
                "success": false,
                "message": "token gagal didapat",
            }) 
        }
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "internal server error", error
        });
    }
}

module.exports = {
    createSnap
}