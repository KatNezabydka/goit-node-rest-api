import express from "express";
import contactController from "../controllers/contactController.js";
import contactValidation from "../validation/ContactValidation.js";
import validateBody from "../decorators/validateBody.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import validateMiddleware from "../middlewares/RequestValidateMiddleware.js";

class ContactsRouter {
    constructor() {
        this.router = express.Router();
        this.initMiddlewares();
        this.initRoutes();
    }

    initMiddlewares() {
        this.router.use(authMiddleware.authenticate.bind(authMiddleware));
    }

    initRoutes() {
        this.router.get(
            "/",
            validateMiddleware.validatePagination.bind(validateMiddleware),
            contactController.getAllContacts
        );

        this.router.get(
            "/:id",
            validateMiddleware.validateId.bind(validateMiddleware),
            contactController.getOneContact
        );

        this.router.post(
            "/",
            validateBody(contactValidation.createContactSchema),
            contactController.createContact
        );

        this.router.put(
            "/:id",
            validateMiddleware.validateId.bind(validateMiddleware),
            validateBody(contactValidation.updateContactSchema),
            contactController.updateContact
        );

        this.router.patch(
            "/:id/favorite",
            validateMiddleware.validateId.bind(validateMiddleware),
            validateBody(contactValidation.updateFavoriteSchema),
            contactController.updateFavoriteStatus
        );

        this.router.delete(
            "/:id",
            validateMiddleware.validateId.bind(validateMiddleware),
            contactController.deleteContact
        );
    }

    getRouter() {
        return this.router;
    }
}

export default new ContactsRouter().getRouter();