import express, {NextFunction, Request, Response} from "express";
import {HttpStatusCode} from "../constants";
import {login, registration} from "./User.service";

export const userController = express.Router();

type IProductResponse<T> = Response<T | { error: string }>

userController.post('/register', async (req: Request, res: IProductResponse<any>, next: NextFunction) => {
    try {
        const userData = await registration(req.body);
        if (userData){
            res.status(HttpStatusCode.OK).send(userData)

        } else {
            res.status(HttpStatusCode.BAD_REQUEST).send({error: 'unable to create user'})
        }
    } catch (err){
        next(err)
    }
})

userController.post('/login', async (req: Request<{ email: string, password: string }>, res: IProductResponse<any>, next: NextFunction) => {
    try {
        const userData = await login(req.body);
        if (userData){
            res.status(HttpStatusCode.OK).send(userData)

        } else {
            res.status(HttpStatusCode.BAD_REQUEST).send({error: 'unable to login'})
        }
    } catch (err) {
        next(err)
    }
});

