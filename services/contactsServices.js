import Contact from "../models/contact.js";

const getContact = query => Contact.findOne({where: query});

export const getContactById = async query => {
    try {
        const contact = await getContact(query);
        if (!contact) {
            return null
        }
        return contact.toPublicJSON();
    } catch (error) {
        throw error;
    }
}


export const listContacts = async (where, options = {}) => {
    try {
        const contacts = await Contact.findAll({
            where,
            ...options,
        });

        return contacts.map(contact => contact.toPublicJSON());
    } catch (error) {
        throw error;
    }
};

const addContact = async data => {
    try {
        const contact = await Contact.create(data);

        return contact.toPublicJSON();
    } catch (error) {
        throw error;
    }
}

const updateContact = async (query, data) => {
    try {
        const contact = await getContact(query);
        if (!contact) return null;

        await contact.update(data);
        return contact.toPublicJSON();
    } catch (error) {
        throw error;
    }
}

const updateStatusContact = async (query, data) => {
    try {
        const contact = await getContact(query);
        if (!contact) {
            return null;
        }

        await contact.update(data);
        return contact.toPublicJSON();
    } catch (error) {
        throw error;
    }
};

const removeContact = async query => {
    try {
        const contact = await getContact(query);
        if (!contact) {
            return null
        }

        await contact.destroy();
        return contact.toPublicJSON();

    } catch (error) {
        throw error;
    }
}

export default {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact,
};