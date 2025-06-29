import express from "express";

import authControllers from "../controllers/authControllers.js";
import authSchemas from "../schemas/authSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import {upload} from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchemas.authRegisterSchema), authControllers.register);
authRouter.post("/login", validateBody(authSchemas.authLoginSchema), authControllers.login);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.patch("/subscription", authenticate, validateBody(authSchemas.updateSubscriptionSchema), authControllers.updateSubscription);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatar);

export default authRouter;
