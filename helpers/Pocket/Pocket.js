import axios from 'axios';

const NEXT_PUBLIC_REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export class Pocket {
  requestToken = null;
  accessToken = null;
  username = null;

  constructor() {
    if(typeof window !== 'undefined') {
      this.requestToken = localStorage.getItem('requestToken');
      this.accessToken = localStorage.getItem('accessToken');
      this.username = localStorage.getItem('username');
    }
  }

  setRequestToken = (newRequestToken) => {
    this.requestToken = newRequestToken;
    localStorage.setItem('requestToken', newRequestToken)

    window.dispatchEvent(new Event('requestTokenChange'));
  }

  setAccessToken = (newAccessToken) => {
    this.accessToken = newAccessToken;
    localStorage.setItem('accessToken', newAccessToken)

    window.dispatchEvent(new Event('accessTokenChange'));
  }

  setUsername = (newUsername) => {
    this.username = newUsername;
    localStorage.setItem('username', newUsername)

    window.dispatchEvent(new Event('usernameChange'));
  }

  getRequestToken = () => {
    return axios.post(
      '/api/user-code',
    )
    .then((response) => {
      const { data: { code} } = response;

      this.setRequestToken(code);

      return code;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  redirectToPocketLogin = () => {
    const requestToken = this.requestToken;
    const url = `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.href = url;
  }

  getUserAccessToken = () => {
    const requestToken = this.requestToken;

    return axios.post(
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

      this.setAccessToken(accessToken);
      this.setUsername(username);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getData = (options) => {
    const accessToken = this.accessToken;

    return axios.post(
      '/api/pocket-get',
      {
        access_token: accessToken,
        state: 'unread',
        sort: 'newest',
        detailType: 'complete',
        ...options,
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

  modify = (options) => {
    const accessToken = this.accessToken;

    return axios.post(
      '/api/pocket-modify',
      {
        access_token: accessToken,
        ...options,
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

  add = (options) => {
    const accessToken = this.accessToken;

    return axios.post(
      '/api/pocket-add',
      {
        access_token: accessToken,
        ...options,
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

  getIsUserLoggedIn = () => {
    if(typeof window === 'undefined') {
      return false;
    }

    const requestToken = this.requestToken;
    const accessToken = this.accessToken;
    const username = this.username;

    return !!requestToken && !!accessToken && !!username;
  }

  logInPart1 = async () => {
    await this.getRequestToken();
    this.redirectToPocketLogin();
  }

  logInPart2 = async () => {
    await this.getUserAccessToken();
  }

  logOut = () => {
    this.requestToken = null;
    this.accessToken = null;
    this.username = null;

    localStorage.clear();

    window.dispatchEvent(new Event('requestTokenChange'));
    window.dispatchEvent(new Event('accessTokenChange'));
    window.dispatchEvent(new Event('usernameChange'));
  }
};

export const pocket = new Pocket();
