const axios = require('axios');

const NEXT_PUBLIC_REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const CONSUMER_KEY = process.env.CONSUMER_KEY;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ error: 'Server error' });
  }

  axios.post(
    'https://getpocket.com/v3/oauth/request',
    {
      consumer_key: CONSUMER_KEY,
      redirect_uri: NEXT_PUBLIC_REDIRECT_URI,
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
