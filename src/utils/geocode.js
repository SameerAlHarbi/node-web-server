const request = require('request');

const geocode = (address = 'jeddah', Callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJ1anVkZSIsImEiOiJjazY1anQyMXkwOGY5M21sdjdqczQ0enN0In0.BzIGjxWHVv_vP7eHlBqwQg&limit=1';

    request({ url, json: true}, (error, response) => {
        if(error) {
            Callback('Unable to connect to location services !', undefined);
        } else if(response.body.features.length === 0) {
            Callback('Unable to find location, Try another search', undefined);
        } else {
            Callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;