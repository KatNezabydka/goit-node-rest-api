import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const readContactsFile = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error.message);
        return [];
    }
}

const writeContactsFile = async (contacts) => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error("Error writing to file:", error.message);
    }
}

const listContacts = async () => {
    return readContactsFile()
}

const getContactById = async (contactId) => {
    const contacts = await readContactsFile();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

const removeContact = async (contactId) => {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) return null;

    const [removedContact] = contacts.splice(index, 1);
    await writeContactsFile(contacts);
    return removedContact;
}

const addContact = async (data) => {
    const contacts = await readContactsFile();

    const newContact = {
        id: nanoid(),
        ...data
    };

    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
}

const updateContact = async (id, data) => {
    const contacts = await readContactsFile();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }

    contacts[index] = {...contacts[index], ...data};
    await writeContactsFile(contacts);

    return contacts[index];
}

export default {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}