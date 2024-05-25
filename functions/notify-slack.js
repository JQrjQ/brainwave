require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body).payload.data;

  const message = {
    text: "New waitlist submission received!",
    attachments: [
      {
        fields: [
          {
            title: "Name",
            value: formData.name,
            short: true
          },
          {
            title: "Email",
            value: formData.email,
            short: true
          }
        ]
      }
    ]
  };

  const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: response.statusText })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Notification sent' })
  };
};
