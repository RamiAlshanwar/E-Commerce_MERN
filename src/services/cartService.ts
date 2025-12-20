import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existInCart) {
    return { data: "item already exist", statusCode: 400 };
  }
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "produict not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock for items", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Item does not exist", statusCode: 400 };
  }
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "produict not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock for items", statusCode: 400 };
  }
  existInCart.quantity = quantity;

  const otherCartItem = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  let total = otherCartItem.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
  //calculate totalAmount
};
