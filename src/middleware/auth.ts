import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    next();
};