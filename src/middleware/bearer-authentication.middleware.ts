import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';


async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try{

        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError("Credentials isn't informed");
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('authentication type is invalide')
        }
        
        const tokenPayload = JWT.verify(token, 'my_secret_key');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('token is invalide')
        }

        const user = {uuid: tokenPayload.sub, username: tokenPayload.username
        }
        req.user =user; 
        next();
    } catch(err){
        next(err);
    }

}

export default bearerAuthenticationMiddleware;