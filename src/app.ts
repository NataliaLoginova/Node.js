import express, {Request, Response, NextFunction} from 'express';
import {connectToDB} from "./db/RDB-connections";
import {productController} from "./product/product.controller";
import {cartController} from "./cart/Cart.contoller";
import bodyParser from "body-parser";
import {extractUser} from "./middlewares/authorization";
import {userController} from "./user/user.controller";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.send({message: err.message});
};

const PORT = 3000;
const app = express();

app.listen(PORT, async () => {
    console.log(`The server has been started on port ${PORT}`);
    await connectToDB();
})

app.use(express.json())
app.use(bodyParser.json())
app.use('/auth', userController)
app.use(productController)
app.use('/profile', cartController)
app.use(errorHandler)
