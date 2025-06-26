import sequelize from "../config/db_connection.js";
import User from "./User.js";
import Contact from "./Contact.js";

const models = {
    User,
    Contact,
};

Object.values(models).forEach((model) => {
    if (typeof model.initModel === "function") {
        model.initModel(sequelize);
    }
});

Object.values(models).forEach((model) => {
    if (typeof model.associate === "function") {
        model.associate(models);
    }
});

export default models;