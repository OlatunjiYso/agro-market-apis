import { encodeAddress } from '../../GeoLocation/encoding'

export const createMarket = async(req, res) => {
    const { name, description, address, category } = req.body;
    try {
        let coordinates =  await encodeAddress(address);

        return res.status(201)
        .json({
            coordinates
        })
    }
    catch(err) {
        return res.status(500)
        .json({
            msg: 'internal server while creating market',
            err
        })
    }
    
}