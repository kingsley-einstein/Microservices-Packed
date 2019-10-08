import jwt from 'jsonwebtoken';

export default (payload, secret) => jwt.sign(payload, secret, {
  expiresIn: 60 * 60 * 30
});
