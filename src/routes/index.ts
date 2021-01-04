import { Router } from 'express';
import authController from '../controllers/AuthController';
import userController from '../controllers/UserController';

import signInValidation from '../validation/signInValidation';
import signUpVerificationValidation from '../validation/signUpVerificationValidation';

const router = Router();

router.post('/', signInValidation, authController.authenticate, userController.authenticate);
router.patch('/verify-signup', signUpVerificationValidation, authController.confirmSignupVerification, authController.authenticate, userController.confirmSignupVerification);
router.get('/newtoken', authController.getNewToken);

router.get('/info', (req, res) => {
    res.status(200).send('Hello from Auth Service');
});

export default router;