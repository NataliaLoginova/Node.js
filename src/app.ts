import express, {Request, Response, NextFunction} from 'express';
import {connectToDB, mongodbUrl} from "./db/db-connection";
import {productController} from "./product/product.controller";
import {cartController} from "./cart/Cart.contoller";
import bodyParser from "body-parser";
import {seedProducts} from "./dataload/seed-products";
import {userController} from "./user/User.controller";
import cookieParser from 'cookie-parser';
import {authMiddleware} from "./middlewares/authentification";
import {seedRoles} from "./dataload/seed-roles";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.send({message: err.message});
};

const PORT = 3000;
const app = express();

app.listen(PORT, async () => {
    console.log(`The server has been started on port ${PORT}`);
    await connectToDB(mongodbUrl);
    await seedProducts();
    await seedRoles();
})

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', userController)
app.use(productController)
app.use('/profile', authMiddleware, cartController)
app.use(errorHandler)
