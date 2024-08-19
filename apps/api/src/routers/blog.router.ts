import { BlogController } from '@/controllers/blog.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class BlogRouter {
  private router: Router;
  private blogController: BlogController;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.blogController.getEvents);
    this.router.post(
      '/',
      verifyToken,
      uploader().single('thumbnail'),
      this.blogController.createEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
