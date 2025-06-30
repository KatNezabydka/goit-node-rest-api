import models from "../../models/index.js";

const {User} = models;
import jwtService from "../JwtService.js";
import passwordService from "../PasswordService.js";
import HttpError from "../../helpers/HttpError.js";
import {findUser} from "../authServices.js";

class AuthService {
    async findUser(query) {
        return User.findOne({where: query});
    }

    async registerUser(payload) {
        const hashPassword = await passwordService.hash(payload.password)
        const user = await User.create({...payload, password: hashPassword});

        return user.toPublicJSON();
    }

    async loginUser({email, password}) {
        const user = await this.findUser({email});
        if (!user) throw new HttpError(401, "Email or password is wrong");

        const passwordCompare = await passwordService.compare(password, user.password);
        if (!passwordCompare) throw new HttpError(401, "Email or password is wrong");

        const payload = {id: user.id};
        const token = jwtService.createToken(payload);

        user.token = token;
        await user.save();

        return {
            token,
            user: user.toPublicJSON()
        };
    }

    async logoutUser({id}) {
        const user = await this.findUser({id});
        if (!user) throw new HttpError(401, "User not found");

        user.token = "";
        await user.save();
    }

    async updateSubscription(id, subscription) {
        const user = await this.findUser({id});
        if (!user) throw new HttpError(404, "User not found");

        user.subscription = subscription;
        await user.save();

        return user.toPublicJSON();
    }

    async updateAvatar(id, avatar) {
        const user = await this.findUser({id});
        if (!user) throw HttpError(404, "User not found");

        user.avatarURL = avatar;
        await user.save();

        return user.toPublicJSON();
    };
}

export default new AuthService();