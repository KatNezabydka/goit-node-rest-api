import express from "express";

import authControllers from "../controllers/authControllers.js";
import authSchemas from "../schemas/authSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchemas.authRegisterSchema), authControllers.register);
authRouter.post("/login", validateBody(authSchemas.authLoginSchema), authControllers.login);
authRouter.get("/current", authenticate, authControllers.getCurrentController);
authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;
