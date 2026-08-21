import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../utils/http-exception';
import { ExplainVerbosity } from 'typeorm';
import { error } from 'node:console';

const JWT_SECRET = process.env.JWT_SECRET || 'furniro_secret_key_2026';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpException(401, 'Token is missing', error);
  }

  // separar o token do 'Bearer'
  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new HttpException(401, 'Token is missing or malformed', error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    throw new HttpException(401, 'Invalid or expired token', error);
  }
}
