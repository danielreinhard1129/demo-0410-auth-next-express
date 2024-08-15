export interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: { name: string };
}
