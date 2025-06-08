import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import contactsSchemas from "../schemas/contactsSchemas.js";
import validateId from "../middlewares/validateId.js";


const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);
contactsRouter.get("/:id", validateId, contactsControllers.getOneContact);
contactsRouter.post("/", validateBody(contactsSchemas.createContactSchema), contactsControllers.createContact);
contactsRouter.put("/:id", validateId, validateBody(contactsSchemas.updateContactSchema), contactsControllers.updateContact);
contactsRouter.patch("/:id/favorite", validateId, validateBody(contactsSchemas.updateFavoriteSchema), contactsControllers.updateFavoriteStatus);
contactsRouter.delete("/:id", validateId, contactsControllers.deleteContact);

export default contactsRouter;
