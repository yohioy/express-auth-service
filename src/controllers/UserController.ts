import { Response } from 'express';
import { responseType } from '@masteryo/masteryo-utils';
import {Users} from "../shared/users";


class UserController {

    async authenticate(req, res: Response) {
        const options = { dbManager: req.dbManager };

        const cognitoId = req.auth.cognitoId;
        const accessToken = req.auth.accessToken;

        let user = new Users(options);

        let userData;
        try {
            userData = await user.findUser(cognitoId);
        } catch (e) {
            console.log(e);
        }

        if(userData) {
            res.status(200).send({ ...responseType.success, ...{ token:accessToken } });
        } else {
            console.log(`Cannot find user. Cognito ID: ${cognitoId}`);
            res.status(401).send(responseType.failed);
        }
    }



    async confirmVerification(req, res: Response) {

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