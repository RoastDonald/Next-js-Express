import { Router } from "express";
import middlewares from "../middlewares";
import UserController from "../controllers/UserController";
import schemas from "@common/validation";

const route = Router();
const userController = new UserController();

export default (app) => {
  app.use("/users", route);

  route.get("/me", middlewares.isAuthenticated, userController.getUserData);
  route.put(
    "/me",
    middlewares.isAuthenticated,
    middlewares.validateDTO(schemas.updateUser),
    userController.updateUser
  );

  route.get("/logout", middlewares.isAuthenticated, userController.logout);

  route.post(
    "/register",
    middlewares.validateDTO(schemas.register),
    userController.register
  );
  route.post(
    "/login",
    middlewares.validateDTO(schemas.login),
    userController.login
  );
  route.post(
    "/login/google",
    middlewares.validateDTO(schemas.loginWithGoogle),
    userController.loginWithGoogle
  );
};
