import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";


const getAllContacts = async (req, res) => {
    const {id} = req.user;
    const contacts = await contactsService.listContacts({owner: id});

    res.json(contacts);
};


const getOneContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.getContact({id, owner})
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact.toPublicJSON());
};

const createContact = async (req, res) => {
        const {id} = req.user;
        const contact = await contactsService.addContact({...req.body, owner: id});

        res.status(201).json(contact.toPublicJSON());
    }
;

const updateContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.updateContact({id, owner}, req.body);
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact.toPublicJSON());
};


const updateFavoriteStatus = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const {favorite} = req.body;
    const contact = await contactsService.updateStatusContact({id, owner}, {favorite});
    if (!contact) {
        throw HttpError(404);
    }

    res.status(200).json(contact.toPublicJSON());
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.removeContact({id, owner});
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact.toPublicJSON());
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus),
    deleteContact: ctrlWrapper(deleteContact),
}
