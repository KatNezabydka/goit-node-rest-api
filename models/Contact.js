import {DataTypes, Model} from "sequelize";
import {emailRegexp} from "../constants/user.js";

class Contact extends Model {
    static initModel(sequelizeInstance) {
        Contact.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        is: emailRegexp,
                    },
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
                        model: 'users',
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: "contact",
                tableName: "contacts",
            }
        );

        return Contact;
    }

    static associate(models) {
        Contact.belongsTo(models.User, {foreignKey: "owner", as: "user"});
    }

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

export default Contact;