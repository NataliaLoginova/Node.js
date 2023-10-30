import {ICheckout} from "./types";
import {createOrder, replaceKeys,} from "./Order.repository";
import {deleteProfileCart, makeCartEntity} from "../cart/Cart.service";
import {IOrder} from "./Order.model";
import {getExistingCart} from "../cart/Cart.repository";

export const makeOrder = async (checkoutData: ICheckout, userIdentity: string): Promise<IOrder | null> => {
    const cart = await getExistingCart(userIdentity);
    if(!cart) {
        return null;
    }
    const {total, cart: {items, id: cartId}} = makeCartEntity(cart);
    const itemsWithNativeIDS = items.map(({product, count}) =>
        ({product: replaceKeys(product, 'id', '_id'), count}))

    const collectOrderData: IOrder = {
        items: itemsWithNativeIDS,
        cartId,
        total,
        userId: userIdentity,
        ...checkoutData
    }

    const {id} = await createOrder(collectOrderData);
    const orderDTO = {
        ...collectOrderData,
        items,
        id
    }

    await deleteProfileCart(userIdentity);

    return orderDTO;
}
