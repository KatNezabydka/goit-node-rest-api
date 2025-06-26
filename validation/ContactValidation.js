import Joi from "joi";
import { minFields } from "../constants/contact.js";

class ContactValidation {
    get createContactSchema() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email({ tlds: { allow: false } }),
            phone: Joi.string().required()
        });
    }

    get updateContactSchema() {
        return Joi.object({
            name: Joi.string(),
            email: Joi.string().email({ tlds: { allow: false } }),
            phone: Joi.string()
        }).min(minFields).messages({
            "object.min": "Body must have at least one field",
        });
    }

    get updateFavoriteSchema() {
        return Joi.object({
            favorite: Joi.boolean().required(),
        });
    }
}

export default new ContactValidation();