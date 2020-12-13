import { Router } from 'express';
import authController from '../controllers/AuthController';
import userController from '../controllers/UserController';

import signInValidation from '../validation/signInValidation';
import signUpVerificationValidation from '../validation/signUpVerificationValidation';

const router = Router();

router.post('/', signInValidation, authController.authenticate, userController.authenticate);
router.patch('/verify-account', signUpVerificationValidation, authController.verifySignUp, authController.authenticate, userController.confirmVerification);

router.get('/info', (req, res) => {
    res.send('Hello from Auth Service');
});

export default router;