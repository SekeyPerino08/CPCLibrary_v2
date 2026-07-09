"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = __importDefault(require("./routes/books"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
});
app.use('/api/books', books_1.default);
// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
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
