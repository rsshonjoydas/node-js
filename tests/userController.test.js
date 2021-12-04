import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userServices')

describe('userController test suite', () => {
  test('getAllUsers should return an array of users', async () => {
    let response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]._id).toBe('1');
  })

  test.only('post should return saved id', async () => {
    let user = { username: 'test37' };
    let response = await request(app).post('/users').send(user);
    expect(response.statusCode).toBe(201);
    let body = response.body;
    expect(body.length).toBe(24);
  })
})

