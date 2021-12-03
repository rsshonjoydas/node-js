
beforeAll(async () => {
  console.log('beforeAll');
})

afterAll(async () => {
  console.log('afterAll');
})

beforeEach(async () => {
  console.log('beforeEach');
})

afterEach(async () => {
  console.log('afterEach');
})

describe('user controller test suites', () => {
  test('should work my fist test', async () => {
    console.log('hello world');
  })
})