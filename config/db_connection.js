import {Sequelize} from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

export default sequelize;