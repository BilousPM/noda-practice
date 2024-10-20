import { ContactCollection } from '../db/models/Contact.js';

export const getContacts = (userId) => ContactCollection.find({ userId });
export const createContact = (contactData) =>
  ContactCollection.create(contactData);

export const deleteContactById = (contactId) =>
  ContactCollection.findByIdAndDelete(contactId);
