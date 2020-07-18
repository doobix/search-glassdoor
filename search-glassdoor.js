const axios = require('axios');

exports.handler = function searchGlassdoor(event, context, callback) {
  const GLASSDOOR_ID = process.env.GLASSDOOR_ID
  const GLASSDOOR_KEY = process.env.GLASSDOOR_KEY
  const endpoint = 'https://api.glassdoor.com/api/api.htm';
  const query = event.queryStringParameters.query;

  axios
    .get(`${endpoint}?t.p=${GLASSDOOR_ID}&t.k=${GLASSDOOR_KEY}&q=${query}&userip=0.0.0.0&useragent=&format=json&v=1&action=employers`)
    .then(({data: {response}}) => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(response)
      })
    })
    .catch((e) => {
      callback(e)
    })
}
