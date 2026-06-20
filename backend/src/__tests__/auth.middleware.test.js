const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middlewares/auth');

process.env.JWT_SECRET = 'test_secret';

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authenticate', () => {
  test('returns 401 when Authorization header is missing', () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('returns 401 for malformed header (no Bearer prefix)', () => {
    const req = { headers: { authorization: 'invalid_token' } };
    const res = mockRes();
    const next = jest.fn();
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('returns 401 for invalid token', () => {
    const req = { headers: { authorization: 'Bearer bad.token.here' } };
    const res = mockRes();
    const next = jest.fn();
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('calls next and attaches payload for valid token', () => {
    const payload = { id: 1, email: 'admin@demo.com', role: 'admin' };
    const token = jwt.sign(payload, 'test_secret');
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();
    authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user.email).toBe('admin@demo.com');
    expect(req.user.role).toBe('admin');
  });
});

describe('authorize', () => {
  test('returns 403 when user role does not match required role', () => {
    const req = { user: { role: 'viewer' } };
    const res = mockRes();
    const next = jest.fn();
    authorize('admin')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('calls next when role matches', () => {
    const req = { user: { role: 'admin' } };
    const res = mockRes();
    const next = jest.fn();
    authorize('admin')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('accepts multiple allowed roles', () => {
    const req = { user: { role: 'viewer' } };
    const res = mockRes();
    const next = jest.fn();
    authorize('admin', 'viewer')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
