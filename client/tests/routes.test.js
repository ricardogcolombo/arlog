const request = require('supertest');
const app = require('../server');

describe('Get Endpoints', () => {
 it('Should do a healthCheck', async () => {
    const res = await request(app)
      .get('/api/v1/health')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0)
  });
  it('should get a folder content', async () => {
    const res = await request(app)
      .get('/api/v1/folder')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0)
  });

it('should get a sub folder content', async () => {
    const res = await request(app)
      .get('/api/v1/folder?url=/data')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0)
  });

  it('should get a file content', async () => {
    const res = await request(app)
      .get('/api/v1/file?filename=install.log')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0)
  });

  it('should get a file content with a pattern', async () => {
    const res = await request(app)
      .get('/api/v1/file?url=/data&filename=test1.log&search=data')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).not.toEqual(0)
  });
// TODO more tests
});
