import Joi from 'joi';
import { responseType } from '@masteryo/masteryo-utils';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_@./#&$£+-]{3,30}$')).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
}).required();

export default async (req, res, next) => {

    const payload = req.body;

    try {
        req.body = await schema.validateAsync(payload);
        next();
    }
    catch (e) {
        console.log(e);
        res.status(404).send(responseType.failed);
    }

}
