import models from "../../models/index.js";
const { Contact } = models;

class ContactService {
    async getContact(query) {
        return Contact.findOne({ where: query });
    }

    async getContactById(query) {
        const contact = await this.getContact(query);
        if (!contact) return null;
        return contact.toPublicJSON();
    }

    async listContacts(where, options = {}) {
        const contacts = await Contact.findAll({
            where,
            ...options,
        });

        return contacts.map(contact => contact.toPublicJSON());
    }

    async addContact(data) {
        const contact = await Contact.create(data);
        return contact.toPublicJSON();
    }

    async updateContact(query, data) {
        const contact = await this.getContact(query);
        if (!contact) return null;

        await contact.update(data);
        return contact.toPublicJSON();
    }

    async updateStatusContact(query, data) {
        const contact = await this.getContact(query);
        if (!contact) return null;

        await contact.update(data);
        return contact.toPublicJSON();
    }

    async removeContact(query) {
        const contact = await this.getContact(query);
        if (!contact) return null;

        await contact.destroy();
        return contact.toPublicJSON();
    }
}

export default new ContactService();
