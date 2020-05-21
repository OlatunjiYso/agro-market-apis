import dbClient from "../../db/knex";

import { marketsTable, imagesTable, locationsTable } from "../../db/tables";

import { encodeAddress } from '../../GeoLocation/encoding'

export const createMarket = async(req, res) => {
    const { name, description, address, categoryId, imageUrl } = req.body;
    try {
        let coordinates =  await encodeAddress(address);
        const { lat, lng } = coordinates;
        let marketRecord = await dbClient(marketsTable).returning('market_id')
        .insert({ category_id: categoryId, market_name: name, market_desc: description });
        const marketId = marketRecord[0];
        await dbClient(imagesTable).insert({ market_id: marketId, image_url: imageUrl });
        await dbClient(locationsTable).insert({ market_id: marketId, lat, lng });

        return res.status(201)
        .json({
            name,
            description,
            address,
            imageUrl,
            coordinates,
        })
    }
    catch(err) {
        return res.status(500)
        .json({
            msg: 'an internal server error occurred while creating market',
            err
        })
    }
    
}