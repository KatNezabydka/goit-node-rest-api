import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const register = async (req, res) => {
    const user = await authServices.registerUser(req.body);

    res.status(201).json(user)
}

const login = async (req, res) => {
    const {token, user} = await authServices.loginUser(req.body);

    res.json({
        token,
        user: user
    });
}

export const logout = async (req, res) => {
    await authServices.logoutUser(req.user);

    res.status(204).json()
}

export const getCurrent = async (req, res) => {
    res.json(req.user.toPublicJSON());
}

export const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;

    const user = await authServices.updateSubscription(id, subscription);

    res.json(user)
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
}