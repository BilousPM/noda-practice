import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createContactController,
  deleteContactController,
  getContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../utils/validateBody.js';
import { contactSchema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', authenticate, ctrlWrapper(getContactsController));
contactsRouter.post(
  '/',
  authenticate,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.delete(
  '/:id',
  authenticate,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
