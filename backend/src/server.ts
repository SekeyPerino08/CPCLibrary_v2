import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import booksRouter from './routes/books';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/books', booksRouter);

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err?.statusCode ?? 500;
  const message = err?.message ?? 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') {
    return res.status(status).json({ error: message, stack: err?.stack });
  }
  return res.status(status).json({ error: message });
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on :${port}`);
});

