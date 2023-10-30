import {NextFunction, Request, Response} from "express";
import {IProduct} from "../../product/types";

const isValidString = (value: any) => typeof value === 'string' && value.trim().length > 0;

export const validateProductCreation = (req: Request<any, any, IProduct>, res: Response<IProduct | {message: string}>, next: NextFunction) => {
    const {body: product} = req;

    if (!product || typeof product !== 'object') {
        return res.status(400).json({ message: 'Invalid product' });
    }

    const { title, description, price } = product;

    if (
        !isValidString(title) ||
        !isValidString(description) ||
        isNaN(price)
    ) {
        return res.status(400).json({ message: 'Invalid product properties' });
    }
    next();
};
