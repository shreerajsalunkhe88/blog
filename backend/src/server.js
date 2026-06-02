import 'dotenv/config';
import express from 'express';
import connectDatabase from './config/database.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const API_VERSION = process.env.API_VERSION || 'v1';

connectDatabase();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(corsMiddleware);

app.use(`/api/${API_VERSION}/posts`, blogRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Blog Post API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Version: ${API_VERSION}`);
});
