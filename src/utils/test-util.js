const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const removeTestUser = async () => {
    await prisma.user.deleteMany({
        where: {
            username: "test"
        }
    });
};

const createTestUser = async () => {
    const hashedPassword = await bcrypt.hash("rahasia", 10);
    await prisma.user.create({
        data: {
            username: "test",
            password: hashedPassword,
        }
    });
};

const removeTestProduct = async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
}

const removeTestOrder = async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
}

module.exports = {
    removeTestUser,
    createTestUser,
    removeTestProduct,
    removeTestOrder
};