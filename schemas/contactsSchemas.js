import Joi from "joi";
import {minFields} from "../constants/contacts.js";

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email({tlds: {allow: false}}),
    phone: Joi.string().required()
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({tlds: {allow: false}}),
    phone: Joi.string()
}).min(minFields).messages({
    "object.min": "Body must have at least one field",
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});


export default {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema,
};