import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userServices')

describe('app test suite', () => {
  test('should my first test suite', () => {
    console.log('my first test suite');
  })

  test('app first test suite', async () => {
    console.log('app first test suite');
    let response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBe(1);
  })
})
