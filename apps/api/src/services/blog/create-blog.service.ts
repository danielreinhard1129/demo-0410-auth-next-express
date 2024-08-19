import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';

interface CreateBlogBody {
  title: string;
  description: string;
  content: string;
  category: string;
}

export const createBlogService = async (
  body: CreateBlogBody,
  file: Express.Multer.File,
  userId: number,
) => {
  try {
    const { title, category, content, description } = body;

    const blog = await prisma.blog.findFirst({
      where: { title },
    });

    if (blog) {
      throw new Error('Title already in use');
    }

    const { secure_url } = await cloudinaryUpload(file);

    return await prisma.blog.create({
      data: {
        title,
        category,
        content,
        description,
        userId,
        thumbnail: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};
