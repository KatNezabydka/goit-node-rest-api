import Joi from "joi";
import {emailRegexp, userSubscription} from "../constants/user.js";

const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

export const authEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

export default {
    authRegisterSchema,
    authLoginSchema,
    updateSubscriptionSchema,
    authEmailSchema,
};