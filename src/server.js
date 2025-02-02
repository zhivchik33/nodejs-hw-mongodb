import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import * as contactServices from './services/contacts-services.js';

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await contactServices.getContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const data = await contactServices.getContactById(contactId);
      if (!data) {
        return res.status(404).json({
          status: 404,
          message: `Contact not found`,
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = Number(getEnvVar('PORT', 27017));
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

