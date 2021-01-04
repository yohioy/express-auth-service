import config from "config";
import { TokenGenerator } from '@masteryo/masteryo-token-generator';

type TTokenConfig = {
    token_secret_key: string;
    token_salt: string;
}

const tokenConfig: TTokenConfig = config.get('TokenConfig');

const tokenOptions = {
    secretKey: tokenConfig.token_secret_key,
    salt: tokenConfig.token_salt
};
const tokenGenerator = new TokenGenerator(tokenOptions);

const splitter = ':*:';


export async function encryptToken(email, refreshToken) {

    const combinedToken = email + splitter + refreshToken;

    const encryptedToken: any = await tokenGenerator.encryptToken(combinedToken);

    return encryptedToken;
}

export async function decryptToken(encryptedToken) {

    const decryptedToken: any = await tokenGenerator.decryptToken(encryptedToken);

    const combinedToken = decryptedToken.split(splitter);

    const token = tokenGenerator.getToken(combinedToken[1]);

    return {
        email: combinedToken[0],
        token: token
    }

}