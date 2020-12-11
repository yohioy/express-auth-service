import { Response } from 'express';
import { responseType } from '@masteryo/masteryo-utils';

class AuthController {

    async authenticate(req, res: Response, next) {

        const cognito = req.cognitoInstance;
        const payload = req.body;

        const email = payload.email;
        const password = payload.password;

        let response;
        try {
            response = await cognito.authenticateUser(email, password);
            req.auth = { cognitoId: response.sub, accessToken: response.accessToken };
            next();
        } catch (e) {
            console.log(e);
            res.status(404).send(responseType.failed);
        }
    }

    async signUp(req, res: Response, next) {

        const cognito = req.cognitoInstance;
        const payload = req.body;

        const email = payload.email;
        const password = payload.password;
        const firstName = payload.firstName;
        const lastName = payload.lastName;

        const cognitoUserAttributes = {
            given_name: firstName,
            family_name: lastName,
            email: email,
        };

        // Add user to Cognito
        let response;
        try {
            response = await cognito.signup(email, password, cognitoUserAttributes);
            req.auth = { cognitoId: response.userSub };
            next();
        } catch (e) {
            console.log(e);
            res.status(404).send(responseType.failed);
        }
    }


    async verifySignUp (req, res: Response, next) {

        const payload = req.body;

        const code = payload.code;
        const email = payload.email;

        const cognito = req.cognitoInstance;

        // Confirm Registration
        try {
            await cognito.confirmRegistration(code, email);
            next();
        } catch (e) {
            console.log(e);
            res.status(404).send(responseType.failed);
        }

    }

}

export default new AuthController();