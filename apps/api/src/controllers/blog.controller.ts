import { getEventsService } from '@/services/blog/get-events.service';
import { NextFunction, Request, Response } from 'express';

export class BlogController {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 2,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };

      const result = await getEventsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
