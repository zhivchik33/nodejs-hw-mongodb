import 'dotenv/config';
console.log('MONGODB_USER:', process.env.MONGODB_USER);

import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
const boostrap = async () => {
  await initMongoConnection();
  startServer();
};

boostrap();


 
