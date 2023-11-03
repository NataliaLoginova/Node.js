import express, {NextFunction, Request, Response} from "express";
import {getProducts, getProduct} from "./Product.service";
import {IExtendedProduct} from "./types";
import {HttpStatusCode} from "../constants";

export const productController = express.Router();

type IProductResponse<T> = Response<T | { error: string }>

productController.get('/products', async (req: Request, res: IProductResponse<IExtendedProduct[]>, next: NextFunction) => {
    try {
        res.send(await getProducts())
    } catch (err){
        next(err)
    }
})

productController.get('/products/:productId', async (req: Request<{ productId: string }>, res: IProductResponse<IExtendedProduct>, next: NextFunction) => {
    const {params: {productId}} = req;
    try {
        const product = await getProduct(productId);
        if (product){
            res.status(HttpStatusCode.OK).send(product)
        } else {
            res.status(HttpStatusCode.NOT_FOUND).send({error: 'The product is not found'})
        }
    } catch (err) {
        next(err)
    }
})
