import { Response } from 'express';
import config from 'config';
import { responseType } from '@masteryo/masteryo-utils';
import { TokenGenerator } from '@masteryo/masteryo-token-generator';

type TTokenConfig = {
    token_secret_key: string;
    token_salt: string;
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

            const tokenConfig: TTokenConfig = config.get('TokenConfig');

            const date = new Date();

            const tokenOptions = {
                secretKey: tokenConfig.token_secret_key,
                salt: tokenConfig.token_salt,
                passwordKey: response.accessToken,
            };
            const tokenGenerator = new TokenGenerator(tokenOptions);
            const encryptedToken = await tokenGenerator.encryptToken(date);

            req.auth = { cognitoId: response.sub, accessToken: encryptedToken };
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