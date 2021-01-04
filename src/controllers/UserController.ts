import { Response } from 'express';
import { responseType } from '@masteryo/masteryo-utils';
import {Users} from "../shared/users";
import { encryptToken } from "../lib/tokenGenerator";

class UserController {

    async authenticate(req, res: Response) {
        const options = { dbManager: req.dbManager };

        const cognitoId = req.auth.cognitoId;
        const refreshToken = req.auth.refreshToken;

        let user = new Users(options);

        let userData;
        try {
            userData = await user.findUser(cognitoId);
        } catch (e) {
            console.log(e);
        }

        const token = await encryptToken(userData.email, refreshToken);

        if(userData) {
            res.header('token', token);
            res.status(200).send({ ...responseType.success });
        } else {
            console.log(`Cannot find user. Cognito ID: ${cognitoId}`);
            res.status(401).send(responseType.failed);
        }
    }



    async confirmSignupVerification(req, res: Response) {

        const options = { dbManager: req.dbManager };
        const cognitoId = req.auth.cognitoId;
        const accessToken = req.auth.accessToken;

        let user = new Users(options);
        try {
            await user.updateVerifiedUser(cognitoId, 'CONFIRMED');
            res.status(200).send({ ...responseType.success, ...{ token:accessToken } });
        } catch (e) {
            console.log(e);
            res.status(401).send(responseType.failed);
        }
    }



}

export default new UserController();