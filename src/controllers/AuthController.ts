import { Request, Response } from 'express';
import config from 'config';
import { Cognito } from '@masteryo/masteryo-cognito';
import { responseType } from '@masteryo/masteryo-utils';


type TCognitoConfig = {
    user_pool_id: string;
    client_id: string;
}

class AuthController {

    async signin(req, res: Response) {

        const db = req.dbConnection;

        const payload = req.body;
        const cognitoConfig: TCognitoConfig = config.get('Cognito');

        const cognitoOptions = {
            UserPoolId: cognitoConfig.user_pool_id,
            ClientId: cognitoConfig.client_id
        };

        const cognito = new Cognito(cognitoOptions);

        let authUserResponse;
        try {
            authUserResponse = await cognito.authenticateUser(payload.email, payload.password);
        } catch (e) {
            console.log(responseType.failed, e);
            res.send(responseType.failed);
        }

        //@todo check user in table

        console.log(authUserResponse);
        res.send(responseType.success);
    }



}


export default AuthController;