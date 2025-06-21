import Contact from "../models/contact.js";

export const getContact = query => Contact.findOne({where: query});

const listContacts = async (query) => {
    return await Contact.findAll({where: query});
}

const addContact = async data => Contact.create(data);

const updateContact = async (query, data) => {
    const contact = await getContact(query);
    if (!contact) return null;

    await contact.update(data);
    return contact;
}

const updateStatusContact = async (query, data) => {
    const contact = await getContact(query);
    if (!contact) {
        return null;
    }

    await contact.update(data);
    return contact;
};

const removeContact = async query => {
    const contact = await getContact(query);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}

export default {
    listContacts,
    getContact,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact,
};