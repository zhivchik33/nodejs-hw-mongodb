import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const db = getEnvVar('MONGODB_DB');

    const url = 'cluster0.n0x6w.mongodb.net'; 
    const uri = `mongodb+srv://${user}:${encodeURIComponent(pwd)}@${url}/${db}?retryWrites=true&w=majority`;
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up Mongo connection:', e.message);
    throw e;
  }
};
