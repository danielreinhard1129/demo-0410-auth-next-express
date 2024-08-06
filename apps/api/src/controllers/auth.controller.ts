import { registerService } from '@/services/auth/register.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
