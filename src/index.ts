/*
 * Filename: index.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import express from 'express';
import connectDB from './config/database';

const app = express();

app.use(express.json());

connectDB();

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
