import {
  Router
} from "express";
import middlewares from "../middlewares";
import ShopController from "../controllers/ShopController";
import schemas from "@common/validation";

const route = Router();
const shopController = new ShopController();

export default (app) => {
  app.use("/products", route);

  route.get("/guitars", shopController.getProducts);
  route.get("/woods", shopController.getWoods);
  route.get("/brands", shopController.getBrands);


  route.post('/shop', middlewares.validateDTO(schemas.filters),
    shopController.getProductsByFilter);


  route.post(
    "/guitars",
    middlewares.isAuthenticated,
    middlewares.isAdmin,
    middlewares.validateDTO(schemas.product),
    shopController.postProduct
  );

  route.post(
    "/woods",
    middlewares.isAuthenticated,
    middlewares.isAdmin,
    middlewares.validateDTO(schemas.wood),
    shopController.postWood
  );

  route.post(
    "/brands",
    middlewares.isAuthenticated,
    middlewares.isAdmin,
    middlewares.validateDTO(schemas.brand),
    shopController.postBrand
  );
};