import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

router.post('/', authenticate(['LIBRARIAN']), async (req, res) => {
  // CRUD logic...
});

export default router;