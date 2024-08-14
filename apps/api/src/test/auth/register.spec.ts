import App from '@/app';
import { User } from '@prisma/client';
import { prismaMock } from '../prisma';
import { hashPassword } from '@/lib/bcrypt';
import request from 'supertest';

jest.mock('@/lib/bcrypt');

const requestBody = {
  name: 'Mock user',
  email: 'mock@mail.com',
  password: 'Admin123',
};

const user: User = {
  id: 1,
  name: 'Mock user',
  email: 'mock@mail.com',
  password: 'hashedPassword',
  provider: 'CREDENTIALS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(() => {
  // ini bakalan dijalankan sebelum testing pertama dijalankan
});

beforeEach(() => {
  // ini bakalan jalan sebelum setiap test
});

afterEach(() => {
  // ini bakalan jalan setelah setiap test
});

afterAll(() => {
  // ini bakalan dijalankan setelah testing terakhir
});

describe('POST /api/auth/register', () => {
  const { app } = new App();
  it('should register user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    (hashPassword as jest.Mock).mockResolvedValueOnce('hashedPassword');
    prismaMock.user.create.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBeDefined();
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
  });
});
