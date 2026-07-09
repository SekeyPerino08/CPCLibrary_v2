"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});
router.post('/', (0, auth_1.authenticate)(['LIBRARIAN']), async (req, res) => {
    // CRUD logic...
});
exports.default = router;
