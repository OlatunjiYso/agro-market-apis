import express from 'express';

import { validateLogin, validateSignup } from '../middlewares/validations';
import { login, signup } from '../controllers/auth';

const authHandler = express.Router();

authHandler.post( '/login', validateLogin, login );
authHandler.post('/signup', validateSignup, signup );

export default authHandler;