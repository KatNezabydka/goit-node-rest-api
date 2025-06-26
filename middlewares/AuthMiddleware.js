import HttpError from "../helpers/HttpError.js";
import userService from "../services/model/UserService.js";
import jwtService from "../services/JwtService.js";

class AuthMiddleware {
    async authenticate(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return next(new HttpError(401, "Authorization header missing"));
            }

            const [bearer, token] = authorization.split(" ");
            if (bearer !== "Bearer" || !token) {
                return next(new HttpError(401, "Authorization header must be 'Bearer <token>'"));
            }

            const { payload, error } = jwtService.verifyToken(token);
            if (error) {
                return next(new HttpError(401, "Not authorized"));
            }

            const user = await userService.findUser({ id: payload.id });
            if (!user || user.token !== token) {
                return next(new HttpError(401, "Not authorized"));
            }

            req.user = user;
            next();

        } catch (err) {
            next(err);
        }
    }
}

export default new AuthMiddleware();