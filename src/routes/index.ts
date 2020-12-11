import { Router } from 'express';
import authController from '../controllers/AuthController';
import userController from '../controllers/UserController';

import signInValidation from '../validation/signInValidation';
import signUpValidation from '../validation/signUpValidation';
import signUpVerificationValidation from '../validation/signUpVerificationValidation';

const router = Router();

router.post('/signin', signInValidation, authController.authenticate, userController.authenticate);
router.post('/signup', signUpValidation, authController.signUp, userController.signUp);
router.patch('/verify-account', signUpVerificationValidation, authController.verifySignUp, authController.authenticate, userController.confirmVerification);

export default router;