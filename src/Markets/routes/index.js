import express from 'express';
 
import { createMarket, deleteMarket, fetchMarket, fetchMarkets } from '../controllers';
import { validateAddingMarket, validateDeletingMarket, validateFetchingMarket } from '../middlewares/validations';
export const marketHandler = express.Router();


marketHandler.post( '/', validateAddingMarket, createMarket);
marketHandler.delete('/:marketId', validateDeletingMarket, deleteMarket);
marketHandler.get('/:marketId', validateFetchingMarket, fetchMarket);
marketHandler.get('/', fetchMarkets);