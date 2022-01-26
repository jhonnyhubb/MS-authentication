import express, { Request, Response, NextFunction} from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import authorizationRoute from './routes/authorization.route'
import errorHandler from './middleware/error-handler.middleware';
import bearerAuthenticationMiddleware from './middleware/bearer-authentication.middleware';


const app = express();

/* app's configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes's configuration */
app.use(statusRoute);
app.use(bearerAuthenticationMiddleware, usersRoute);
app.use(authorizationRoute);

/* error handler configuration */
app.use(errorHandler);
     
/* server startup */
app.listen(3000, () => {
    console.log('listening on port 3000')
})