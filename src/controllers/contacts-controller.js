
import * as contactServices from '../services/contacts-services.js';
import createHttpError from 'http-errors';
export const getContactsController = async (req, res) => {
  const contacts = await contactServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);
  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { isNew, data } = await contactServices.updateContact(
    contactId,
    req.body,
    {
      upsert: true,
    },
  );
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data,
  });
};
export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactServices.updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.data,
  });
};
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.dleteContact({ _id: contactId });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }
  res.status(204).send();
};