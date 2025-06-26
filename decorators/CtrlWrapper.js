import { ValidationError, UniqueConstraintError } from "sequelize";

class CtrlWrapper {
    constructor(ctrl) {
        this.ctrl = ctrl;
        this.handler = this.handler.bind(this);
    }

    async handler(req, res, next) {
        try {
            await this.ctrl(req, res, next);
        } catch (error) {
            if (error instanceof ValidationError) {
                error.status = 400;
            }
            if (error instanceof UniqueConstraintError) {
                error.status = 409;
            }
            next(error);
        }
    }
}

export default CtrlWrapper;