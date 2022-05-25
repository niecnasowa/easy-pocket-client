const axios = require('axios');

const CONSUMER_KEY = process.env.CONSUMER_KEY;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ error: 'Server error' });
  }

  if (!req.body) {
    res.status(500).json({ error: 'Missing request body' });
  }

  axios.post(
    'https://getpocket.com/v3/add',
    {
      consumer_key: CONSUMER_KEY,
      ...req.body,
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
    console.log('error', error);
    res.status(500).json({ error: 'Eternal api error' });
  });
};
