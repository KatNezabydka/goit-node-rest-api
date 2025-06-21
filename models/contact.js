import sequelize from "../config/db_connection.js";
import {DataTypes} from "sequelize";
import {emailRegexp} from "../constants/user.js";
import User from "./user.js";

const Contact = sequelize.define(
    'contact', {
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
        }
    })

export default Contact;
