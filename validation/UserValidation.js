import Joi from "joi";
import { emailRegexp, userSubscription } from "../constants/user.js";

class UserValidation {
    get userRegisterSchema() {
        return Joi.object({
            email: Joi.string().pattern(emailRegexp).required(),
            password: Joi.string().min(6).required(),
        });
    }

    get userLoginSchema() {
        return Joi.object({
            email: Joi.string().pattern(emailRegexp).required(),
            password: Joi.string().min(6).required(),
        });
    }

    get userUpdateSubscriptionSchema() {
        return Joi.object({
            subscription: Joi.string().valid(...userSubscription).required(),
        });
    }
}

export default new UserValidation();