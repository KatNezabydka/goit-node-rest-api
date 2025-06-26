import contactsService from "../services/model/ContactService.js";
import HttpError from "../helpers/HttpError.js";
import CtrlWrapper from "../decorators/CtrlWrapper.js";

class ContactController {
    async getAllContacts(req, res) {
        const { id } = req.user;
        const { offset, limit, favorite } = req.pagination;

        const filter = { owner: id };
        if (favorite !== undefined) {
            filter.favorite = favorite;
        }

        const contacts = await contactsService.listContacts(filter, { limit, offset });
        res.json(contacts);
    }

    async getOneContact(req, res) {
        const { id } = req.params;
        const { id: owner } = req.user;

        const contact = await contactsService.getContactById({ id, owner });
        if (!contact) throw new HttpError(404);

        res.json(contact);
    }

    async createContact(req, res) {
        const { id } = req.user;
        const contact = await contactsService.addContact({ ...req.body, owner: id });

        res.status(201).json(contact);
    }

    async updateContact(req, res) {
        const { id } = req.params;
        const { id: owner } = req.user;

        const contact = await contactsService.updateContact({ id, owner }, req.body);
        if (!contact) throw new HttpError(404);

        res.json(contact);
    }

    async updateFavoriteStatus(req, res) {
        const { id } = req.params;
        const { id: owner } = req.user;
        const { favorite } = req.body;

        const contact = await contactsService.updateStatusContact({ id, owner }, { favorite });
        if (!contact) throw new HttpError(404);

        res.status(200).json(contact);
    }

    async deleteContact(req, res) {
        const { id } = req.params;
        const { id: owner } = req.user;

        const contact = await contactsService.removeContact({ id, owner });
        if (!contact) throw new HttpError(404);

        res.json(contact);
    }
}

const contactsController = new ContactController();

export default {
    getAllContacts: new CtrlWrapper(contactsController.getAllContacts.bind(contactsController)).handler,
    getOneContact: new CtrlWrapper(contactsController.getOneContact.bind(contactsController)).handler,
    createContact: new CtrlWrapper(contactsController.createContact.bind(contactsController)).handler,
    updateContact: new CtrlWrapper(contactsController.updateContact.bind(contactsController)).handler,
    updateFavoriteStatus: new CtrlWrapper(contactsController.updateFavoriteStatus.bind(contactsController)).handler,
    deleteContact: new CtrlWrapper(contactsController.deleteContact.bind(contactsController)).handler,
};