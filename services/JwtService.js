import jwt from "jsonwebtoken";

class JwtService {
    constructor(secret, expiresIn = "23h") {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    createToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token) {
        try {
            const payload = jwt.verify(token, this.secret);
            return { payload };
        } catch (error) {
            return { error };
        }
    }
}

const { JWT_SECRET } = process.env;
const jwtService = new JwtService(JWT_SECRET);

export default jwtService;