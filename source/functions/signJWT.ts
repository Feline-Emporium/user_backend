import jwt from 'jsonwebtoken';
import config from "../config/config";
import logging from "../config/logging";
import IUser from "../interfaces/user";

const NAMESPACE = "User";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000; 
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: "HS256",
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    throw new Error(error.message);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
}

export default signJWT;