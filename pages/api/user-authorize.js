const axios = require('axios');

const CONSUMER_KEY = process.env.CONSUMER_KEY;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ error: 'Server error' });
  }

  const requestToken = req.body?.requestToken;

  if (!requestToken) {
    res.status(500).json({ error: 'Missing user requestToken' });
  }

  axios.post(
    'https://getpocket.com/v3/oauth/authorize',
    {
      consumer_key: CONSUMER_KEY,
      code: requestToken,
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
    }
  )
  .then((response) => {
    const { data } = response;

    res.status(200).json(data);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Eternal api error' });
  });
};
