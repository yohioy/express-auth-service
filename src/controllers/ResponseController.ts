import { Response } from 'express';
import config from 'config';
import { responseType } from '@masteryo/masteryo-utils';
import { TokenGenerator } from '@masteryo/masteryo-token-generator';

type TTokenConfig = {
    token_secret_key: string;
    token_salt: string;
}

// @todo - do we need this
class ResponseController {

    async generateResponse(req, res: Response) {

        const tokenConfig: TTokenConfig = config.get('TokenConfig');

        const tokenOptions = {
            secretKey: tokenConfig.token_secret_key,
            salt: tokenConfig.token_salt
        };

        const accessToken = req.accessToken;
        const refreshToken = req.refreshToken;

        const tokenGenerator = new TokenGenerator(tokenOptions);
        const encryptedToken = await tokenGenerator.encryptToken(accessToken);


        res.cookie('token', encryptedToken, { httpOnly: true });
        res.cookie('token', encryptedToken, { httpOnly: true });

    }

}

export default new ResponseController();