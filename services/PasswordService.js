import bcrypt from "bcrypt";

class PasswordService {
    constructor(saltRounds = 10) {
        this.saltRounds = saltRounds;
    }

    async hash(password) {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default new PasswordService();