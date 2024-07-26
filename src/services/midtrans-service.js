const midtransClient = require("midtrans-client");

const createSnap = async (transactionData) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY || "",
            clientKey: process.env.CLIENT_KEY || ""
        });

        let snapToken = await snap.createTransaction(transactionData);
        return snapToken.token;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createSnap
}