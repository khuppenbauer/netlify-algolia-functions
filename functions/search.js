const dotenv = require('dotenv').config();
const algoliasearch = require('algoliasearch');

const appId = process.env.ALGOLIA_APPLICATION_ID;
const searchKey = process.env.ALGOLIA_ADMIN_API_KEY;

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body);
    const { index: algoliaIndex, query } = body;
    const client = algoliasearch(appId, searchKey);
    const index = client.initIndex(algoliaIndex);
    const res = await index.search('', query);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    };
  }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: "Ok"
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};