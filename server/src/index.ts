import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors, { type CorsOptions } from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose, { ConnectOptions } from 'mongoose';
import mainRouter from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import { initAdmin } from './admin/index.js';

/* Configurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// Initialize AdminJS
const { admin, router } = await initAdmin();
app.use(admin.options.rootPath, router);

// Body Parser
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', mainRouter);

// Error handling middleware
app.use(errorHandler);

/* Mongo DB */

const clientOptions: ConnectOptions = {
  dbName: 'shopco',
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
