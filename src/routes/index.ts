import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

const authController: AuthController = new AuthController();

router.post('/login', authController.signin);

export default router;