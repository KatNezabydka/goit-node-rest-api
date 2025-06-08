import {Sequelize} from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

export default sequelize;