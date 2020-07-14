const postman = require('postman-request');


const geocode = (locationName, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + locationName + '.json?access_token=pk.eyJ1IjoiaGFzZGEiLCJhIjoiY2tjYm1va2lhMjNjYjJwcXNkeWR0cXBmeCJ9.itjFYCSFgAdOABJ6gCUWYQ&limit=1';
    postman({url: geoUrl, json: true}, (error, {body}={}) => {
        if (error)
            callback('Connection failed', undefined);
        else if (body.features.length == 0)
            callback('Location can\'t be found, use another search', undefined);
        else
            {
                longitude = body.features[0].center[0];
                latitude = body.features[0].center[1];
                location = body.features[0].place_name;
                callback(undefined, {longitude, latitude, location});
            }
    });
};

module.exports = geocode
