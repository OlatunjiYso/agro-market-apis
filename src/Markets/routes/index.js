import express from 'express';
 
import { createMarket } from '../controllers';

export const marketHandler = express.Router();


marketHandler.post( '/', createMarket);