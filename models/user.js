import sequelize from "../config/db_connection.js";
import {DataTypes, Model} from "sequelize";
import {default_subscription, emailRegexp, userSubscription} from "../constants/user.js";

class User extends Model {
    toPublicJSON() {
        return {
            email: this.email,
            subscription: this.subscription,
        };
    }
}

User.init(
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            match: emailRegexp,
            unique: {
                args: true,
                msg: "Email in use",
            },
        },
        subscription: {
            type: DataTypes.ENUM,
            values: userSubscription,
            defaultValue: default_subscription,
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: "user",
        tableName: "users",
    }
);

export default User;