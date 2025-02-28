import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const uri = 'mongodb+srv://arepko33:ilAncyhUG4WVjVbh@cluster0.n0x6w.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(uri);

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up Mongo connection:', e.message);
    throw e;
  }
};
