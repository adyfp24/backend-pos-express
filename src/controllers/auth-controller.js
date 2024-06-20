const authService = require('../services/auth-service');
const { successResponse, clientErrorResponse, errorResponse } = require('../middlewares/response');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loggedInUser = await authService.login(username, password);

        if (!loggedInUser.success) {
            return clientErrorResponse(res, loggedInUser.message);
        }

        return successResponse(res, loggedInUser.data, "login berhasil", 200);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const registUser = await authService.register(username, password);
        if(!registUser.success){
            return clientErrorResponse(res, registUser.message);
        }
        return successResponse(res, registUser.data, "registrasi user berhasil", 201);
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    login,
    register
}