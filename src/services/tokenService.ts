/*
 * Filename: tokenService.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
  claims: {
    roles: string[];
    source: {
      ip: string;
      device: string;
      platform: string;
      browser?: string;
    };
    scopes: string[];
    app_id: string;
  };
}

export const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, 'your-secret-key') as JwtPayload;
  } catch (error) {
    return 'Invalid token';
  }
};
