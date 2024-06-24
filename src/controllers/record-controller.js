const recordService = require('../services/record-service');
const ExcelJS = require('exceljs');

const getTransactionRecord = async (req, res) => {
    try {
        const month = req.query.month; 
        const year = parseInt(req.query.year);

        const transactionRecords = await recordService.getTransactionRecord(month, year);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transaction Records');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Tanggal', key: 'tanggal', width: 20 },
            { header: 'Total', key: 'total', width: 10 },
            { header: 'Product', key: 'product', width: 30 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Subtotal', key: 'subtotal', width: 15 }
        ];

        transactionRecords.forEach(record => {
            record.details.forEach(detail => {
                worksheet.addRow({
                    id: record.id,
                    tanggal: record.tanggal.toLocaleDateString(),
                    total: record.total,
                    product: detail.product.nama,
                    quantity: detail.quantity,
                    subtotal: detail.subtotal
                });
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=TransactionRecords.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTransactionRecord
}