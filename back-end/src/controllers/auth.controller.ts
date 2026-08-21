import { RepositoryNotTreeError } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { Request, Response, NextFunction } from 'express';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
