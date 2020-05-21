import axios from 'axios';

const apiKey = process.env.GOOGLE_MAP_API_KEY;

export const encodeAddress = async(address) => {
console.log(address)
    try {
        let query = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=ng&key=${apiKey}`;
        const response = await axios.get(query);
        let coordinates = response.data.results[0].geometry.location;
        return coordinates;
    }
    catch(err) {
        console.log('There was an error')
        console.log(err)
        return err
    }

}