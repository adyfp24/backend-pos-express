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

module.exports = {
    removeTestUser,
    createTestUser
};