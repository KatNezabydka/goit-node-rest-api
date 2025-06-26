import HttpError from "../helpers/HttpError.js";

class ValidateBody {
    constructor(schema) {
        this.schema = schema;
        this.handler = this.handler.bind(this);
    }

    handler(req, _, next) {
        const { error } = this.schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return next(new HttpError(400, error.message));
        }

        next();
    }
}

export default (schema) => {
    const validator = new ValidateBody(schema);
    return validator.handler;
};