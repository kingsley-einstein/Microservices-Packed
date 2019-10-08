import bcrypt from 'bcryptjs';
import db from '../db';
import helpers from '../helpers';

const {
  models: {
    User,
    Blacklist
  }
} = db;

const { jwt } = helpers;

export default class AuthController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async signUp(req, res) {
    try {
      const { body } = req;
      const user = await User.create(body);
      const data = {
        id: user.id,
        username: user.username,
        token: jwt({
          id: user.id,
          password: user.password
        }, 'secret')
      };
      res.status(201).json({
        status: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findByUsername(username);
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
        return;
      }
      const data = {
        id: user.id,
        username: user.username,
        token: jwt({
          id: user.id,
          password: user.password
        }, 'secret')
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async authenticate(req, res) {
    try {
      const { user } = req;
      const data = {
        id: user.id,
        username: user.username
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    try {
      const { body, user } = req;
      const data = await User.updateById(user.id, body);
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async logout(req, res) {
    try {
      const { token, user } = req;
      const blacklist = await Blacklist.create({
        token
      });
      const data = {
        message: `Successfully signed out user ${user.username}`,
        details: blacklist
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}
