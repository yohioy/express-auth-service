import { Request } from 'express';
import passport from 'passport-strategy';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoAccessToken
} from 'amazon-cognito-identity-js';

export class CognitoAuthStrategy extends passport.Strategy {

    private readonly name;
    private readonly poolData;
    private readonly userPool;
    private readonly verify;

    constructor(options, verify) {
        super();

        if (!options) throw new Error('Cognito strategy requires options');
        if (!verify) throw new Error('Cognito strategy requires a verify callback');

        this.name = 'cognito';
        this.poolData = {
            UserPoolId: options.UserPoolId,
            ClientId: options.ClientId
        };
        this.userPool = new CognitoUserPool(this.poolData);
        this.verify = verify;

    }

    authenticate (req: Request, options) {
        let user = {};
        console.log('OOOOOK');
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return this.fail({ message: 'Missing credentials' }, 400);
        }

    }

}

