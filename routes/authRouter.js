import express from "express";

import authController from "../controllers/AuthController.js";
import userValidation from "../validation/UserValidation.js";
import validateBody from "../decorators/ValidateBody.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import uploadMiddleware from "../middlewares/UploadMiddleware.js";

class AuthRouter {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post(
            "/register",
            validateBody(userValidation.userRegisterSchema),
            authController.register
        );

        this.router.post(
            "/login",
            validateBody(userValidation.userLoginSchema),
            authController.login
        );

        this.router.post(
            "/logout",
            authMiddleware.authenticate.bind(authMiddleware),
            authController.logout
        );

        this.router.get(
            "/current",
            authMiddleware.authenticate.bind(authMiddleware),
            authController.getCurrent
        );

        this.router.patch(
            "/subscription",
            authMiddleware.authenticate.bind(authMiddleware),
            validateBody(userValidation.userUpdateSubscriptionSchema),
            authController.updateSubscription
        );

        this.router.patch(
            "/avatars",
            authMiddleware.authenticate.bind(authMiddleware),
            uploadMiddleware.upload.single("avatar"),
            authController.updateAvatar
        );

    }

    getRouter() {
        return this.router;
    }
}

export default new AuthRouter().getRouter();