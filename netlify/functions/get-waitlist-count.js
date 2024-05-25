const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { NETLIFY_API_TOKEN, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_API_TOKEN || !NETLIFY_FORM_ID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required environment variables' }),
    };
  }

  try {
    const response = await fetch(`https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NETLIFY_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }


    const form = await response.json();
    const count = form.submission_count;

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
