const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (products) => {
    try {
        const newTransaction = await prisma.$transaction(async (prisma) => {
            const transaction = await createTransaction(prisma);
            let total = 0;

            for (const item of products) {
                const product = await getProductById(prisma, item.productId);
                if (!product || product.stok < item.quantity) {
                    throw new Error(`Product with id ${item.productId} is out of stock or not available`);
                }
                const subtotal = await processProduct(prisma, transaction.id, product, item.quantity);
                await updateProductStock(prisma, product.id, product.stok - item.quantity);
                total += subtotal;
            }

            await updateTransactionTotal(prisma, transaction.id, total);
            return transaction;
        });

        const transactionWithDetails = await getTransactionDetails(prisma, newTransaction.id);

        return formatTransactionResponse(transactionWithDetails);
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
};

const createTransaction = async (prisma) => {
    return prisma.transaction.create({
        data: {
            tanggal: new Date(),
            total: 0
        }
    });
};

const getProductById = async (prisma, productId) => {
    return prisma.product.findUnique({
        where: { id: productId },
    });
};

const processProduct = async (prisma, transactionId, product, quantity) => {
    const subtotal = quantity * product.harga;
    await prisma.detailTransaction.create({
        data: {
            transactionId: transactionId,
            productId: product.id,
            quantity: quantity,
            subtotal: subtotal
        }
    });
    return subtotal;
};

const updateProductStock = async (prisma, productId, newStock) => {
    await prisma.product.update({
        where: { id: productId },
        data: { stok: newStock }
    });
};

const updateTransactionTotal = async (prisma, transactionId, total) => {
    await prisma.transaction.update({
        where: { id: transactionId },
        data: { total: total },
    });
};

const getTransactionDetails = async (prisma, transactionId) => {
    return prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
            details: {
                include: {
                    product: true
                }
            }
        }
    });
};

const formatTransactionResponse = (transaction) => {
    const transactionDetails = transaction.details.map(detail => ({
        produk: detail.product.nama,
        jumlahProduk: detail.quantity,
        harga: detail.product.harga
    }));

    return {
        id: transaction.id,
        tanggal: transaction.tanggal,
        total: transaction.total,
        detailTransaksi: transactionDetails
    };
};

module.exports = {
    createOrder,
};
