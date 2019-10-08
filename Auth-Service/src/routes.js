import { Router } from 'express';
import controller from './controller';
import middlewares from './middlewares';

const { AuthController } = controller;
const { Auth } = middlewares;

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'You have reached the auth service.'
  });
});

router.post(
  '/auth/register',
  Auth.checkBody,
  AuthController.signUp
);

router.post(
  '/auth/login',
  Auth.checkBody,
  AuthController.login
);

router.post(
  '/auth/logout',
  Auth.checkToken,
  AuthController.logout
);

router.patch(
  '/auth/update',
  Auth.checkToken,
  AuthController.update
);

router.get(
  '/auth/authenticate',
  Auth.checkToken,
  AuthController.authenticate
);

export default router;
