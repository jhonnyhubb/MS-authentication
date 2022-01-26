import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../errors/database.error.model";
import ForbiddenError from "../errors/forbidden.error.model";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    if(err instanceof DatabaseError){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        } else if(err instanceof ForbiddenError){
            res.sendStatus(StatusCodes.FORBIDDEN);
        } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

export default errorHandler;