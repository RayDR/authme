/*
 * Filename: tokenLogRepository.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import mongoose, { Schema } from 'mongoose';

const TokenLogSchema = new Schema({
  user_id: { type: String, required: true },
  ip: { type: String, required: true },
  device: { type: String, required: true },
  platform: { type: String, required: true },
  browser: { type: String },
  app_id: { type: String, required: true },
  issued_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true },
});

export const TokenLog = mongoose.model('TokenLog', TokenLogSchema);
