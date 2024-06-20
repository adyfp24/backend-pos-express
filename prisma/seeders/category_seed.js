const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    await prisma.category.createMany({
        data: [
            { name: 'pelumas' },
            { name: 'velg' },
            { name: 'mesin' }
        ]
    });
}

module.exports = seed;
