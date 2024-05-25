const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { NETLIFY_API_TOKEN, SITE_ID, FORM_ID } = process.env;

  try {
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/forms/${NETLIFY_FORM_ID}/submissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NETLIFY_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.statusText }),
      };
    }

    const submissions = await response.json();
    const count = submissions.length;

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
