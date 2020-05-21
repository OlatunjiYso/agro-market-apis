import express from 'express';
 
import { createMarket, deleteMarket } from '../controllers';
import { validateAddingMarket, validateDeletingMarket } from '../middlewares/validations';
export const marketHandler = express.Router();


marketHandler.post( '/', validateAddingMarket, createMarket);
marketHandler.delete('/:marketId', validateDeletingMarket, deleteMarket);