/*
 * Filename: authMiddleware.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/tokenService';
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded;
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
