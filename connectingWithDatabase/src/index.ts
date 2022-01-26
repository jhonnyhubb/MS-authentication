import express, { Request, Response, NextFunction} from 'express';
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';
import errorHandler from './middleware/error-handler.middleware';

const app = express();

/* app's configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes's configuration */
app.use(usersRoute);
app.use(statusRoute);

/* error handler configuration */
app.use(errorHandler);
     
/* server startup */
app.listen(3000, () => {
    console.log('listening on port 3000')
})