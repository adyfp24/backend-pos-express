const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (products) => {
    let total = 0;
    const newTransaction = await prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.create({
            data: {
                tanggal: new Date(),
                total: 0
            }
        });

        for (const item of products) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product || product.stok < item.quantity) {
                throw new Error(`Product with id ${item.productId} is out of stock or not available`);
            }

            const subtotal = item.quantity * product.harga;

            await prisma.detailTransaction.create({
                data: {
                    transactionId: transaction.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    subtotal: subtotal
                }
            });

            await prisma.product.update({
                where: { id: product.id },
                data: { stok: product.stok - item.quantity }
            });

            total += subtotal;
        }

        await prisma.transaction.update({
            where: { id: transaction.id },
            data: { total: total },
        });

        return transaction;
    });

    const transactionWithDetails = await prisma.transaction.findUnique({
        where: { id: newTransaction.id },
        include: {
            details: {
                include: {
                    product: true
                }
            }
        }
    });

    const transactionDetails = transactionWithDetails.details.map(detail => ({
        produk: detail.product.nama,
        jumlahProduk: detail.quantity,
        harga: detail.product.harga
    }));

    return {
        id: transactionWithDetails.id,
        tanggal: transactionWithDetails.tanggal,
        total: transactionWithDetails.total,
        detailTransaksi: transactionDetails
    };
};

module.exports = {
    createOrder,
};
