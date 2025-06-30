import userServices from "../services/model/UserService.js";
import CtrlWrapper from "../decorators/CtrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {join, resolve} from "node:path";
import {rename, unlink} from "node:fs/promises";

class AuthController {
    async register(req, res) {
        const user = await userServices.registerUser(req.body);
        res.status(201).json(user);
    }

    async login(req, res) {
        const {token, user} = await userServices.loginUser(req.body);
        res.json({token, user});
    }

    async logout(req, res) {
        await userServices.logoutUser(req.user);
        res.status(204).json();
    }

    async getCurrent(req, res) {
        res.json(req.user.toPublicJSON());
    }

    async updateSubscription(req, res) {
        const {id} = req.user;
        const {subscription} = req.body;
        const user = await userServices.updateSubscription(id, subscription);
        res.json(user);
    }

    async updateAvatar(req, res) {
        const postersDir = resolve("public", "avatars");
        const {id} = req.user;

        if (!req.file) {
            throw HttpError(404, "No file uploaded");
        }
        let oldPath;

        try {
            const {path: tempPath, filename} = req.file;
            oldPath = tempPath;
            const newPath = join(postersDir, filename);
            await rename(oldPath, newPath);
            const avatarURL = join("avatars", filename);

            const user = await userServices.updateAvatar(id, avatarURL);

            res.json(user);
        } catch (error) {
            if (oldPath) {
                await unlink(oldPath);
            }
            throw HttpError(500);
        }
    }
}

const authController = new AuthController();

export default {
    register: new CtrlWrapper(authController.register.bind(authController)).handler,
    login: new CtrlWrapper(authController.login.bind(authController)).handler,
    logout: new CtrlWrapper(authController.logout.bind(authController)).handler,
    getCurrent: new CtrlWrapper(authController.getCurrent.bind(authController)).handler,
    updateSubscription: new CtrlWrapper(authController.updateSubscription.bind(authController)).handler,
    updateAvatar: new CtrlWrapper(authController.updateAvatar.bind(authController)).handler,
};