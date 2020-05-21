import express from 'express';
 
import { createMarket } from '../controllers';
import { validateMarket } from '../middlewares/validations';
export const marketHandler = express.Router();


marketHandler.post( '/', validateMarket, createMarket);