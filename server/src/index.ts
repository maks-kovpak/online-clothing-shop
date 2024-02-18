import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose, { ConnectOptions } from 'mongoose';
import mainRouter from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

/* Configurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use('/api', mainRouter);

app.use(errorHandler); // Error handling middleware

/* Mongo DB */

const clientOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

async function main() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI!, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    await mongoose.disconnect();
    console.dir(error);
  }
}

/* Start the server */

const PORT = process.env.PORT || 3000;

function start() {
  app.listen(PORT, () => console.log(`Started server on http://localhost:${PORT}`));
}

main().then(start);
