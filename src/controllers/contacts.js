import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getContacts,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getContacts(req.user._id);

  res.json(contacts);
};

export const createContactController = async (req, res) => {
  const contactData = { ...req.body, userId: req.user._id };
  const newContact = await createContact(contactData);

  res.status(201).json(newContact);
};

export const deleteContactController = async (req, res) => {
  const contact = await deleteContactById(req.params.id);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.sendStatus(204);
};
