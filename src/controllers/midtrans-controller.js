const midtransService = require("../services/midtrans-service");

const createSnap = async (req, res) => {
    try {
        const transactionData = {
            
        } = req.body;
        const snapToken = await midtransService.createSnap();
        if (snapToken != null) {
            return res.status(200).json({
                "success": false,
                "message": "token berhasil didapat",
                "data" : {
                    "snap_token" : snapToken
                }
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