import ShopRepo from "../../repository/ShopRepo";

class ShopController {
  constructor() {}

  getProducts = async (req, res, next) => {
    let { order, sortBy, limit } = req.query.filters || {};
    order = order || "asc";
    sortBy = sortBy || "_id";
    limit = Math.min(100, parseInt(limit));
    const sortProps = [order, sortBy];
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.getProducts(sortProps, limit);
    if (error) {
      return res.status(500).json({
        message: "Cannot find products",
      });
    }
    res.status(200).json({ data });
  };

  postProduct = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.saveProduct(req.body);
    if (error) {
      return res
        .status(500)
        .json({ message: "Cannot save product, try later" });
    }
    res.status(200).json({ data });
  };

  postWood = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.saveWood(req.body);
    if (error) {
      return res.status(500).json({ message: "Cannot save wood, try later" });
    }
    res.status(200).json({ data });
  };

  getWoods = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.getWoods();
    if (error) {
      return res.status(500).json({ message: "Cannot find wood, try later" });
    }
    res.status(200).json({ data });
  };

  postBrand = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.saveBrand(req.body);
    if (error) {
      return res.status(500).json({ message: "Cannot save brand, try later" });
    }
    res.status(200).json({ data });
  };

  getBrands = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const { error, data } = await shopRepo.getBrands();
    if (error) {
      return res.status(500).json({ message: "Cannot find brand, try later" });
    }
    res.status(200).json({ data });
  };
}

export default ShopController;
