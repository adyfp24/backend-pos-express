const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const utilsToken = require('../utils/sign-token');

const login = async (username, password) => {
    try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return { success: false, message: 'Username tidak valid' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const apiToken = utilsToken.generateJWT(user.id);
            return {
                success: true,
                data: { user, token: apiToken },
            };
        } else {
            return { success: false, message: 'Password salah' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error : ' + error);
    }
};

const register = async (username, password) => {
    try {
        const isUsernameExist = await prisma.user.findUnique({ where: { username: username } });
        if (isUsernameExist) {
            return { succes: false, message: "username telah digunakan" }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: username, 
                password: hashedPassword
            }
        });

        return {
            success: true,
            data: newUser,
        };
    } catch (error) {
        console.log(error);
        throw new Error('Internal server error : ' + error);
    }
};

module.exports = {
    login,
    register
}