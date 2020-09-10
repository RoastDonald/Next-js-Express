import Product from "../models/product";
import Wood from "../models/wood";
import Brand from "../models/brand";
import logger from "../loaders/logger";

class ShopRepo {
  constructor() {}

  getProducts = async (sortProps, limit) => {
    try {
      const products = await Product.find()
        .populate("brand")
        .populate("wood")
        .sort([sortProps].join(" "))
        .limit(limit)
        .exec();

      return { error: null, data: products };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };
  saveProduct = async (productProps) => {
    try {
      const product = new Product(productProps);
      const savedProduct = await product.save();
      return { error: null, data: savedProduct };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };

  saveWood = async (woodProps) => {
    try {
      const wood = new Wood(woodProps);
      const savedWood = await wood.save();
      return { error: null, data: savedWood };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };
  getWoods = async () => {
    try {
      const woods = await Wood.find();
      return { error: null, data: woods };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };
  saveBrand = async (brandProps) => {
    try {
      const brand = new Brand(brandProps);
      const savedBrand = await brand.save();
      return { error: null, data: savedBrand };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };
  getBrands = async () => {
    try {
      const brands = await Brand.find();
      return { error: null, data: brands };
    } catch (error) {
      logger.error(error);
      return { error, data: null };
    }
  };
}

export default ShopRepo;
