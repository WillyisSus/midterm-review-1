import {Router} from 'express';
import authController from '../controllers/auth.controller.js';
const authRoute = Router();

authRoute.post('/login', authController.postOne)
authRoute.post('/signup', authController.postOne)
authRoute.post('/logout', authController.postOne)
authRoute.post('/refreshToken', authController.postOne)

export default authRoute;

