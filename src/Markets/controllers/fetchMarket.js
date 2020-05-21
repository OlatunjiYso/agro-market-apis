import dbClient from "../../db/knex";
import { marketsTable, locationsTable, imagesTable } from "../../db/tables";

export const fetchMarket = async (req, res) => {
  const { marketId } = req.params;

  try {
    let marketRecord = await dbClient(marketsTable)
     .where({[`${marketsTable}.market_id`]: marketId})
      .leftJoin(
        locationsTable,
        `${marketsTable}.market_id`,
        `${locationsTable}.market_id`
      )
      .leftJoin(
        imagesTable,
        `${marketsTable}.market_id`,
        `${imagesTable}.market_id`
      )
      .select(
        `${marketsTable}.market_id`,
        `${marketsTable}.category_id`,
        `${marketsTable}.market_name`,
        `${marketsTable}.market_desc`,
        `${imagesTable}.image_url`,
        `${locationsTable}.lat`,
        `${locationsTable}.lng`
      );
    if (marketRecord.length === 0) {
      return res
        .status(404)
        .json({ msg: "found no market with specified marketId" });
    }
    return res
      .status(200)
      .json({ msg: "market found", market: marketRecord[0] });
  } catch (err) {
    return res.status(500).json({
      msg: "an internal server error occurred while fetching market",
      err,
    });
  }
};
