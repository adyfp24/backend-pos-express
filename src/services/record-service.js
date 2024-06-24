const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTransactionRecord = async (month, year) => {
    try {
        const monthMap = {
            januari: 0,
            februari: 1,
            maret: 2,
            april: 3,
            mei: 4,
            juni: 5,
            juli: 6,
            agustus: 7,
            september: 8,
            oktober: 9,
            november: 10,
            desember: 11
        };

        const monthNumber = monthMap[month.toLowerCase()];

        const startDate = new Date(year, monthNumber, 1);
        const endDate = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);

        const transactionRecord = await prisma.transaction.findMany({
            where: {
                tanggal: {
                    gte: startDate,
                    lt: endDate
                }
            },
            include: {
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return transactionRecord;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getTransactionRecord
}