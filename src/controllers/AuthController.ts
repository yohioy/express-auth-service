import { Response } from 'express';
import { responseType } from '@masteryo/masteryo-utils';
import { decryptToken } from "../lib/tokenGenerator";

type TDecryptTokenData = {
    email: string;
    token: string;
}



class AuthController {

    async authenticate(req, res: Response, next) {

        const cognito = req.cognitoInstance;
        const payload = req.body;

        const email = payload.email;
        const password = payload.password;

        let response;
        try {
            response = await cognito.authenticateUser(email, password);
            req.auth = { cognitoId: response.sub, refreshToken: response.refreshToken };
            next();
        } catch (e) {
            console.log(e);
            res.status(404).send(responseType.failed);
        }
    }



    async confirmSignupVerification (req, res: Response, next) {

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


    async getNewToken (req, res: Response, next) {
        const refreshToken = req.headers['x-refresh-token'];

        if (!refreshToken) {
            console.log('No Refresh Token', refreshToken);
            return res.status(404).send(responseType.failed);
        }

        const decryptTokenData: TDecryptTokenData = await decryptToken(refreshToken);

        const email = decryptTokenData.email;
        const token = decryptTokenData.token;

        const cognito = req.cognitoInstance;

        //@todo - generate csrf token and send with the access token
        let tokens;
        try {
            tokens = await cognito.renewToken(email, token);
            res.header('token', tokens.accessToken);
            res.status(200).send({ ...responseType.success });
        } catch (e) {
            console.log(e);
            res.status(404).send(responseType.failed);
        }

    }

}

export default new AuthController();