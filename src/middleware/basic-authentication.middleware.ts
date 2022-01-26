import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';


async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credentials not informed');
        }

        const [authenticationType, token] =  authorizationHeader.split(' ')

        if(authenticationType !== 'basic' || !token) {
            throw new ForbiddenError('authentication type is invalide')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        if(!username || !password) {
            throw new ForbiddenError("Credentials isn't filled")
        }

        const user = await userRepository.findByUsernameAndPassword(username, password)
        console.log(user);

        if(!user) {
            throw new ForbiddenError('user or password is invalid')
        }

        req.user = user;
        next();
    }catch (err) {

    }
}

export default basicAuthenticationMiddleware;