const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { NETLIFY_API_TOKEN, NETLIFY_SITE_ID, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_API_TOKEN || !NETLIFY_SITE_ID || !NETLIFY_FORM_ID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required environment variables' }),
    };
  }

  try {
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/forms`, {
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

    const forms = await response.json();
    const form = forms.find(form => form.id === NETLIFY_FORM_ID);

    if (!form) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Form not found' }),
      };
    }

    const count = form.submission_count + 51; // Add 51 to the submission count

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
