const midtransClient = require("midtrans-client");

const createSnap = (transactionData) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY,
            clientKey: process.env.CLIENT_KEY
        });

        let snapToken = snap.createTransaction(transactionData);
        return snapToken;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createSnap
}