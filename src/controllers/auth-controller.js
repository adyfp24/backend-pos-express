const authService = require('../services/auth-service');
const { successResponse, clientErrorResponse, errorResponse } = require('../middleware/response');

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const loggedInUser = await authService.login(username, password);
      
      if (!loggedInUser.success) {
        return clientErrorResponse(res, loggedInUser.message);
      }
  
      successResponse(res, loggedInUser.data, loggedInUser.message, 200);
    } catch (error) {
      errorResponse(res, error);
    }
  };

const register = () => {

};

module.exports = {
    login,
    register
}