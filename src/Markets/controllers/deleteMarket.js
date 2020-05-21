import dbClient from "../../db/knex";
import { marketsTable } from "../../db/tables";


export const deleteMarket = async(req, res) => {
    const { marketId } = req.params;

    try {
        let marketRecord = await dbClient(marketsTable).select('*').where('market_id', marketId);
        if (marketRecord.length === 0) {
            return res.status(404)
            .json({ msg: 'found no market with specified marketId' });
        }
        await dbClient(marketsTable).where('market_id', marketId).del();
        return res.status(200)
        .json({ msg: 'market and its related entities deleted '})
      
    }
    catch(err) {
        return res.status(500)
        .json({
            msg: 'an internal server error occurred while deleting market',
            err
        })
    }
    
}