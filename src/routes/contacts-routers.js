import { Router } from 'express';
import * as contactsController from '../controllers/contacts-controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidid.js';
import { contactsAddSchema, contactsUpdateSchema } from '../validation/contacts-schemas.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsController.addContactController));

contactsRouter.put(
  '/:contactId',
  ctrlWrapper(contactsController.upsertContactController),
);
contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactsController.patchContactController),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;