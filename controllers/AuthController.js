import userServices from "../services/model/UserService.js";
import CtrlWrapper from "../decorators/CtrlWrapper.js";

class AuthController {
    async register(req, res) {
        const user = await userServices.registerUser(req.body);
        res.status(201).json(user);
    }

    async login(req, res) {
        const { token, user } = await userServices.loginUser(req.body);
        res.json({ token, user });
    }

    async logout(req, res) {
        await userServices.logoutUser(req.user);
        res.status(204).json();
    }

    async getCurrent(req, res) {
        res.json(req.user.toPublicJSON());
    }

    async updateSubscription(req, res) {
        const { id } = req.user;
        const { subscription } = req.body;
        const user = await userServices.updateSubscription(id, subscription);
        res.json(user);
    }
}

const authController = new AuthController();

export default {
    register: new CtrlWrapper(authController.register.bind(authController)).handler,
    login: new CtrlWrapper(authController.login.bind(authController)).handler,
    logout: new CtrlWrapper(authController.logout.bind(authController)).handler,
    getCurrent: new CtrlWrapper(authController.getCurrent.bind(authController)).handler,
    updateSubscription: new CtrlWrapper(authController.updateSubscription.bind(authController)).handler,
};