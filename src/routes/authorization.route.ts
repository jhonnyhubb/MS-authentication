import { Router, Request, Response, NextFunction } from 'express';
import ForbiddenError from '../errors/forbidden.error.model'
import userRepository from '../repositories/user.repository'
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middleware/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {    
    try {
    
        const user = req.user;

        if(!user) {
            throw new ForbiddenError("User doesn't informed!")
        }
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK ).json({ token: jwt });

        // "iss" The domain of the application generating the token
        // "sub" It is the token's subject, but it is often used to store the user ID
        // "aud" Defines who can use the token
        // "exp" Date to display the token
        // "nbf" Sets a date for which the token cannot be accepted before it
        // "iat" Token creation date
        // "jti" The token id

    } catch (err) {
        next(err);
    }

});

export default authorizationRoute;