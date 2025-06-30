import {DataTypes, Model} from "sequelize";
import {default_subscription, emailRegexp, userSubscription} from "../constants/user.js";

class User extends Model {
    static initModel(sequelizeInstance) {
        User.init(
            {
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: {
                        args: true,
                        msg: "Email in use",
                    },
                    validate: {
                        is: emailRegexp,
                    },
                },
                subscription: {
                    type: DataTypes.ENUM(...userSubscription),
                    defaultValue: default_subscription,
                },
                token: {
                    type: DataTypes.STRING,
                    defaultValue: null,
                },
                avatarUrl: DataTypes.STRING,
            },
            {
                sequelize: sequelizeInstance,
                modelName: "user",
                tableName: "users",
            }
        );

        return User;
    }

    static associate(models) {
        User.hasMany(models.Contact, {foreignKey: "owner", as: "contacts"});
    }

    toPublicJSON() {
        return {
            email: this.email,
            subscription: this.subscription,
            avatarURL: this.avatarUrl,
        };
    }
}

export default User;