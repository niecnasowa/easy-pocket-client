import axios from 'axios';

const NEXT_PUBLIC_REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export class Pocket {
  getUserCode = () => {
    axios.post(
      '/api/user-code',
    )
    .then((response) => {
      const { data: { code} } = response;
      console.log('data', response.data);

      localStorage.setItem('userCode', code)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  redirectToPocketLogin = () => {
    const requestToken = localStorage.getItem('userCode');
    const url = `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.href = url;
  }

  getUserAccessToken = () => {
    const requestToken = localStorage.getItem('userCode');

    axios.post(
      '/api/user-authorize',
      {
        requestToken,
      },
    )
    .then((response) => {
      const {
        access_token: accessToken,
        username,
      } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getData = () => {
    const accessToken = localStorage.getItem('accessToken');

    axios.post(
      '/api/pocket-get',
      {
        access_token: accessToken,
        state: 'unread'
      },
    )
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
};
