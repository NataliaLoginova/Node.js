import {NextFunction, Request, Response} from "express";
import {UserModel} from "../user/User.model";

export const extractUser = async(req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['x-user-id'] || '';
    if (authorizationHeader) {
        const isExist = await UserModel.findById(authorizationHeader);
        if (isExist) {
            return next();
        } else {
            return res.status(400).json({ message: 'User is not authorized' });
        }
    } else {
        return res.status(403).json({ message: 'You must be authorized user' });
    }
};
