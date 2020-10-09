import ShopRepo from "../../repository/ShopRepo";

class ShopController {
  constructor() {}

  _validator = (objToValidate, defaultValues) => {
    for (let key in defaultValues) {
      if (!objToValidate[key]) {
        objToValidate[key] = defaultValues[key]();
      }
    }
    objToValidate['limit'] = Math.min(100, parseInt(objToValidate['limit'], 10));
    return objToValidate;
  }

  getProductsByFilter = async (req, res, next) => {
    const validFilters = this._validator(req.body, {
      order: () => "desc",
      sortBy: () => '_id',
      skip: () => 0
    });
    const args = {};

    for (let key in validFilters.filters) {
      if (!validFilters.filters[key].length) continue;
      if (key === 'price') {
        if (!validFilters.filters[key].length) {
          args[key] = {
            $gte: 0
          };
        } else {
          args[key] = {
            $gte: validFilters.filters[key][0],
            $lte: validFilters.filters[key][1]
          };
        }
      } else {
        args[key] = validFilters.filters[key];
      }
    }
    const {
      sortBy,
      order,
      skip,
      limit
    } = validFilters;
    const sortProps = [sortBy, order];
    const shopRepo = new ShopRepo();

    args['publish'] = true;


    const {
      error,
      data,
      size
    } = await shopRepo.getProducts(sortProps, args, skip, limit);
    if (error) {
      return res.status(500).json({
        message: "Cannot find products",
      });
    }
    res.status(200).json({
      data,
      size
    });
  }

  getProducts = async (req, res, next) => {

    const validFilters = this._validator(req.query, {
      sortBy: () => 'sold',
      order: () => 'desc',
      limit: () => this.DEFAULT_LIMIT
    });
    const {
      order,
      sortBy,
      limit
    } = validFilters;
    const sortProps = [order, sortBy];
    const shopRepo = new ShopRepo();
    const {
      error,
      data,
      size
    } = await shopRepo.getProducts(sortProps, null, null, limit);
    if (error) {
      return res.status(500).json({
        message: "Cannot find products",
      });
    }
    res.status(200).json({
      data,
      size
    });
  };

  postProduct = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const {
      error,
      data
    } = await shopRepo.saveProduct(req.body);
    if (error) {
      return res
        .status(500)
        .json({
          message: "Cannot save product, try later"
        });
    }
    res.status(200).json({
      data
    });
  };

  postWood = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const {
      error,
      data
    } = await shopRepo.saveWood(req.body);
    if (error) {
      return res.status(500).json({
        message: "Cannot save wood, try later"
      });
    }
    res.status(200).json({
      data
    });
  };

  getWoods = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const {
      error,
      data,
      size
    } = await shopRepo.getWoods();
    if (error) {
      return res.status(500).json({
        message: "Cannot find wood, try later"
      });
    }
    res.status(200).json({
      data,
      size
    });
  };

  postBrand = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const {
      error,
      data
    } = await shopRepo.saveBrand(req.body);
    if (error) {
      return res.status(500).json({
        message: "Cannot save brand, try later"
      });
    }
    res.status(200).json({
      data
    });
  };

  getBrands = async (req, res, next) => {
    const shopRepo = new ShopRepo();
    const {
      error,
      data,
      size
    } = await shopRepo.getBrands();
    if (error) {
      return res.status(500).json({
        message: "Cannot find brand, try later"
      });
    }
    res.status(200).json({
      data,
      size
    });
  };
}

export default ShopController;