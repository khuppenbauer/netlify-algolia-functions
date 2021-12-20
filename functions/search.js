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
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};