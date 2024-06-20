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
            message: 'Login sukses',
            data: { user, token: apiToken },
          };
        } else {
          return { success: false, message: 'Password salah' };
        }
      } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
      }
};

const register = () => {

};

module.exports = {
    login,
    register
}