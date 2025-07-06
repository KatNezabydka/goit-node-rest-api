import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import {resolve, join} from "node:path";
import {rename, unlink} from "node:fs/promises";
import HttpError from "../helpers/httpError.js";

const postersDir = resolve("public", "avatars");

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
    const {id} = req.user;
    const {subscription} = req.body;

    const user = await authServices.updateSubscription(id, subscription);

    res.json(user)
}

export const updateAvatar = async (req, res) => {
    const {id} = req.user;

    if (!req.file) {
        throw HttpError(404, "No file uploaded");
    }
    try {
        let avatarURL = null;

        const {path: oldPath, filename} = req.file;
        const newPath = join(postersDir, filename);
        await rename(oldPath, newPath);
        avatarURL = join("avatars", filename);

        await authServices.updateAvatar(id, avatarURL);

        res.json({avatarURL});
    } catch (error) {
        await unlink(oldPath);
        throw HttpError(500);
    }
};

const verifyController = async (req, res) => {
    const {verificationToken} = req.params;
    await authServices.verifyUser(verificationToken);

    res.json({
        message: "Verification successful"
    })
}

const resendVerifyController = async (req, res) => {
    await authServices.resendVerifyUser(req.body.email);

    res.json({
        message: "Verification email sent"
    })
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyController: ctrlWrapper(verifyController),
    resendVerifyController: ctrlWrapper(resendVerifyController),
}