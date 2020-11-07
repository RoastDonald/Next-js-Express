
import {Router} from 'express';
import AdminController from '../controllers/AdminController';
import middlewares from "../middlewares";
import schemas from "@common/validation";

const router = Router();
const adminController = new AdminController();
export default (app)=>{
    app.use('/admin',router);
    router.route('/users')
        .get(middlewares.isAuthenticated,middlewares.isAdmin, adminController.getUsers)
        .delete(middlewares.isAuthenticated,middlewares.isAdmin,middlewares.validateDTO(schemas.email,{query:true}),adminController.deleteUser);
}