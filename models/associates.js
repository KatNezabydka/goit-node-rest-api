import User from "./user.js";
import Contact from "./contact.js";

User.hasMany(Contact, {foreignKey: 'owner', as: 'contacts'});
Contact.belongsTo(User, {foreignKey: 'owner', as: 'user'});