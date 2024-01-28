import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Started server on http://localhost:${port}`));
