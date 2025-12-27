import productModel from "../models/productModel";

export const getAll = async () => {
  return await productModel.find();
};

export const seedInitialProduct = async () => {
  try {
    const products = [
      {
        title: "Asus G18",
        image:
          "https://dlcdnwebimgs.asus.com/files/media/d5444a20-d912-40e3-9a48-bbacc1e3a4e6/v1/images/Strix_G18_KV_16x9.webp",
        price: 3000,
        stock: 100,
      },
    ];

    const exist = await getAll();

    if (exist.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};
