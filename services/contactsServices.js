import Contact from "../models/contact.js";

const listContacts = async () => {
    return await Contact.findAll();
}

const getContactById = async contactId => {
    const contact = await Contact.findByPk(contactId);
    return contact || null;
}

const addContact = async data => {
    return Contact.create(data);
}

const updateContact = async (id, data) => {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    await contact.update(data);
    return contact;
}

const updateStatusContact = async (id, data) => {
    const contact = await Contact.findByPk(id);
    if (!contact) {
        return null;
    }

    await contact.update(data);
    return contact;
};

const removeContact = async contactId => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}

export default {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact,
};