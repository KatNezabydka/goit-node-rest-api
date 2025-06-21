import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const login = async (req, res) => {
    const {token, user} = await authServices.loginUser(req.body);

    res.json({
        token,
        user: user.toPublicJSON()
    });
}

const register = async (req, res) => {
    const user = await authServices.registerUser(req.body);

    res.status(201).json(user.toPublicJSON())
}

export const getCurrentController = async (req, res) => {
    res.json(req.user.toPublicJSON());
}

export const logoutController = async (req, res) => {
    await authServices.logoutUser(req.user);

    res.status(204).json()
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrentController: ctrlWrapper(getCurrentController),
    logoutController: ctrlWrapper(logoutController),
}