import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!contactId || !isValidObjectId(contactId)) {
    return next(createHttpError(400, `Invalid contact ID: ${contactId || 'undefined'}`));
  }
  next();
};
