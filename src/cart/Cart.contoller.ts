import express, {NextFunction, Request, Response} from "express";
import {deleteProfileCart, handleGetCartInfo, updateProfileCart} from "./Cart.service";
import {ICart} from "./Cart.model";
import {ICheckout} from "../order/types";
import {validateUpdateCartStructure} from "../middlewares/validators/updateCartValidator";
import {makeOrder} from "../order/Order.service";
import {IOrder} from "../order/Order.model";
import {HttpStatusCode} from "../constants";

export const cartController = express.Router();

export interface IShortResponse {
    statusCode: HttpStatusCode;
    message?: string;
}

interface ICartResponse<T> extends IShortResponse {
    data: {
        cart: T;
        total: number;
    };
}

interface IOrderResponse<T> extends IShortResponse {
    data: {
        order: T;
    };
}


cartController.get('/cart', async (req: Request, res: Response<ICartResponse<ICart>>, next: NextFunction) => {
    const authorizationHeader = (req.headers['x-user-id'] || '') as string;
    try {
        const {total, cart} = await handleGetCartInfo(authorizationHeader);
        res.json({statusCode: HttpStatusCode.OK, message: 'cart retrieved', data: {total, cart}});
    } catch (err) {
        next(err);
    }
})
cartController.post('/cart/checkout', async (req: Request<any, any, ICheckout>, res: Response<IOrderResponse<IOrder> | IShortResponse>, next: NextFunction) => {
    const {body} = req;
    const authorizationHeader = req.headers['x-user-id'] as string;
    try {
        const order = await makeOrder(body, authorizationHeader);
        if (order) {
            res.json({statusCode: HttpStatusCode.CREATED, message: 'cart retrieved', data: {order}})
        } else {
            res.json({statusCode: HttpStatusCode.NO_CONTENT, message: 'no content'})
        }
    } catch (err) {
        next(err);
    }
})

cartController.put('/cart', validateUpdateCartStructure, async (req: Request<any, any, ICart>, res: Response<ICartResponse<ICart> | IShortResponse>, next: NextFunction) => {
    const {body} = req;
    const authorizationHeader = req.headers['x-user-id'] as string;
    try {
        const updatedData = await updateProfileCart(body, authorizationHeader);
        if (updatedData) {
            res.send({statusCode: HttpStatusCode.OK, message: 'cart data', data: {...updatedData}});
        } else {
            res.send({statusCode: HttpStatusCode.NOT_FOUND, message: 'cart is not found'});
        }
    } catch (err) {
        next(err)
    }
})

cartController.delete('/cart', async (req: Request, res: Response<IShortResponse>, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['x-user-id'] as string;
        const isDeleted = await deleteProfileCart(authorizationHeader);
        if (isDeleted) {
            res.send({statusCode: HttpStatusCode.OK, message: 'the cart has been deleted'});
        } else {
            res.send({statusCode: HttpStatusCode.NOT_FOUND, message: 'cart is not found'});
        }
    } catch (err) {
        next(err)
    }
})
