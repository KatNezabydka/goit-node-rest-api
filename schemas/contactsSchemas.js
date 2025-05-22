import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email({tlds: {allow: false}}),
    phone: Joi.string().required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({tlds: {allow: false}}),
    phone: Joi.string()
}).min(1).messages({
    "object.min": "Body must have at least one field",
});