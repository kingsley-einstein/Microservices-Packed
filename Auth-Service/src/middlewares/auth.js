import jwt from 'jsonwebtoken';
import db from '../db';
import helpers from '../helpers';

const {
  models: {
    Blacklist,
    User
  }
} = db;

const { validateBody } = helpers;

export default class Auth {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async checkToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        status: 401,
        error: 'Authorization header not present in request.'
      });
      return;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Token not found in auth header.'
      });
      return;
    }
    const verified = await new Promise((resolve) => {
      jwt.verify(token, 'secret', null, (errors, decoded) => {
        resolve(decoded);
      });
    });
    if (!verified) {
      res.status(401).json({
        status: 401,
        error: 'Token is not valid.'
      });
      return;
    }
    const loggedOut = await Blacklist.findByToken(token);
    if (loggedOut) {
      res.status(401).json({
        status: 401,
        error: 'Only logged in users can access this resource'
      });
      return;
    }
    const payload = jwt.decode(token);
    const user = await User.findByPk(payload.id);
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'Unable to authenticate user'
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static async checkBody(req, res, next) {
    const hasRequiredKeys = validateBody(req, ['username', 'password']);
    if (!hasRequiredKeys) {
      res.status(400).json({
        status: 400,
        error: 'Body is missing required keys'
      });
      return;
    }
    next();
  }
}
