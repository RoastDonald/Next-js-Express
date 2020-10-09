import {
    Router
} from "express";
import middlewares from "../middlewares";
import FileController from '../controllers/FileController';
import formidable from 'express-formidable';

const route = Router();
const fileController = new FileController();


export default (app) => {
    app.use("/file", route);
    route.post("/upload", middlewares.isAuthenticated, middlewares.isAdmin, formidable({
        multiples: true,
    }), fileController.handleFileUpload);
    route.post('/delete', middlewares.isAuthenticated, middlewares.isAdmin, fileController.handleFileDelete);
};