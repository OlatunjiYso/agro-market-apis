import dbClient from "../../db/knex";
import { marketsTable, locationsTable, imagesTable } from "../../db/tables";

export const fetchMarket = async (req, res) => {
  const { marketId } = req.params;

  try {
    let marketRecord = await dbClient(marketsTable)
      .where({ [`${marketsTable}.market_id`]: marketId })
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

export const fetchMarkets = async (req, res) => {
  let { name, category } = req.query;
  let nameFilter = '%%';
  let categoryFilter = {};

  if (name) nameFilter = `%${name}%`;
  if (category && category !== 'all') categoryFilter[`${marketsTable}.category_id`] = category;

  try {
    let marketRecords = await dbClient(marketsTable)
      .where(`${marketsTable}.market_name`, 'like', nameFilter ) 
      .andWhere(categoryFilter)
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

    if (marketRecords.length === 0) {
      return res
        .status(404)
        .json({ msg: "no market found for the set parameters" });
    }

    return res
      .status(200)
      .json({ msg: "market(s) found", markets: marketRecords[0] });
  } catch (err) {
    return res.status(500).json({
      msg: "an internal server error occurred while fetching markets",
      err,
    });
  }
};
