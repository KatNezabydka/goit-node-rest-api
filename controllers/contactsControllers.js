import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";


const getAllContacts = async (req, res) => {
    const {id} = req.user;
    const {offset, limit, favorite} = req.pagination;

    const filter = {owner: id};

    if (favorite !== undefined) {
        filter.favorite = favorite;
    }

    const contacts = await contactsService.listContacts(filter, {limit, offset});

    res.json(contacts);
};


const getOneContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.getContactById({id, owner})
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const createContact = async (req, res) => {
        const {id} = req.user;
        const contact = await contactsService.addContact({...req.body, owner: id});

        res.status(201).json(contact);
    }
;

const updateContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.updateContact({id, owner}, req.body);
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};


const updateFavoriteStatus = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const {favorite} = req.body;
    const contact = await contactsService.updateStatusContact({id, owner}, {favorite});
    if (!contact) {
        throw HttpError(404);
    }

    res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsService.removeContact({id, owner});
    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus),
    deleteContact: ctrlWrapper(deleteContact),
}
