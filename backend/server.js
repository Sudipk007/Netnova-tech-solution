import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import authRoutes         from './src/routes/auth.js';
import contactRoutes      from './src/routes/contact.js';
import chatRoutes         from './src/routes/chat.js';
import testimonialRoutes  from './src/routes/testimonials.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'netnova', 'dist');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api/auth',         authRoutes);
app.use('/api/contact',      contactRoutes);
app.use('/api/chat',         chatRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.use(express.static(DIST));
app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server → http://localhost:${PORT}`));
});
