import config from 'config';
import { Cognito } from '@masteryo/masteryo-cognito';


type TCognitoConfig = {
    user_pool_id: string;
    client_id: string;
}


export const CognitoInit = () => {
    const cognitoConfig: TCognitoConfig = config.get('Cognito');

    return async (req, res, next) => {
        const cognitoOptions = {
            UserPoolId: cognitoConfig.user_pool_id,
            ClientId: cognitoConfig.client_id
        };

        req.cognitoInstance = new Cognito(cognitoOptions);
        next ();
    }

}