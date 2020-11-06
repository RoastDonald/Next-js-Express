import Product from "../models/product";
import Wood from "../models/wood";
import Brand from "../models/brand";
import logger from "../loaders/logger";
import {Mongoose} from 'mongoose';
class ShopRepo {
  constructor() {}
  DEFAULT_LIMIT = 6;

  getProducts = async (sortProps, args = {}, skip = 0, limit = this.DEFAULT_LIMIT) => {
    try {
      const products = await Product
        .find(args)
        .populate("brand")
        .populate("wood")
        .sort([sortProps].join(" "))
        .skip(skip)
        .limit(limit)
        .exec();
      return {
        error: null,
        data: products,
        size: products.length

      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null
      };
    }
  };
  saveProduct = async ({available,brand,description,price,publish,name,frets,shipping,images,wood}) => {
    try {
      const product = new Product({
        available,
        brand,
        description,
        price,
        publish,
        name,
        frets,
        shipping,
        wood,
        images,
      });
      console.log(product);
      const savedProduct = await product.save();
      return {
        error: null,
        data: savedProduct
      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null
      };
    }
  };

  saveWood = async (woodProps) => {
    try {
      const wood = new Wood(woodProps);
      const savedWood = await wood.save();
      return {
        error: null,
        data: savedWood
      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null
      };
    }
  };
  getWoods = async () => {
    try {
      const woods = await Wood.find();
      return {
        error: null,
        data: woods,
        size: woods.length
      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null
      };
    }
  };
  saveBrand = async (brandProps) => {
    try {
      const brand = new Brand(brandProps);
      const savedBrand = await brand.save();
      return {
        error: null,
        data: savedBrand
      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null
      };
    }
  };
  getBrands = async () => {
    try {
      const brands = await Brand.find();
      return {
        error: null,
        data: brands
      };
    } catch (error) {
      logger.error(error);
      return {
        error,
        data: null,
        size: brands.length

      };
    }
  };
}

export default ShopRepo;