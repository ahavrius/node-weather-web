let postmen = require('postman-request');

// callback example
// const add = (v1, v2, callback)=> setTimeout(() => callback(v1 + v2), 2000);
// add(1, 2, (sum)=> console.log(sum));

const forcast = (lan, lon, callback) => {
    const forcastUrl = 'http://api.weatherstack.com/current?access_key=7a05dbb13cf997ccedf6401b7daabc84&query=' + lan + ',' + lon;
    postmen({url: forcastUrl, json: true}, (error, {body} = {}) => {
        if (error)
            callback('can\'t connect to the forcast server');
        else if (body.error)
            callback('location hasn\'t found', undefined);
        else
        {
            callback(undefined, {
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
                feelslike : body.current.feelslike,
                str: `
                temperature ${body.current.temperature},
                ${body.current.weather_descriptions[0]},
                feels like ${body.current.feelslike}`
            })
        }
    });
};

module.exports = forcast