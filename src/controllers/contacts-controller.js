import * as contactServices from '../services/contacts-services.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contacts.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactsFilterParams(req.query);

  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id, 
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }

  const data = await contactServices.getContactById({ _id: contactId, userId: req.user._id });

  if (!data) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully found contact with id contactId',
    data,
  });
};

export const addContactController = async (req, res, next) => {
  const newContact = {
    ...req.body,
    userId: req.user._id, 
  };

  const data = await contactServices.addContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }

  const updatedContact = await contactServices.updateContact(
    { _id: contactId, userId: req.user._id }, 
    req.body,
    { upsert: true, new: true }
  );

  if (!updatedContact) {
    return next(createHttpError(500, 'Failed to upsert contact'));
  }

  const status = updatedContact.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: updatedContact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }

  const result = await contactServices.updateContact(
    { _id: contactId, userId: req.user._id }, 
    req.body
  );

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }

  const data = await contactServices.deleteContact({ _id: contactId, userId: req.user._id }); 

  if (!data) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};