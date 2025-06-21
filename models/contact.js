import sequelize from "../config/db_connection.js";
import {DataTypes, Model} from "sequelize";
import {emailRegexp} from "../constants/user.js";
import User from "./user.js";


class Contact extends Model {
    toPublicJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            favorite: this.favorite,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

Contact.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            match: emailRegexp
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: "contact",
        tableName: "contacts",
    });

export default Contact;
