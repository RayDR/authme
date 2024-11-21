/*
 * Filename: Token.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  token: string;
  userId: string;
  ip: string;
  device: string;
  claims: Record<string, any>;
  status: 'active' | 'revoked';
  createdAt: Date;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema<IToken>({
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  ip: { type: String },
  device: { type: String },
  claims: { type: Object, default: {} },
  status: { type: String, enum: ['active', 'revoked'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<IToken>('Token', TokenSchema);
