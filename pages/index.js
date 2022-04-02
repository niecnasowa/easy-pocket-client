import axios from 'axios';

// localStorage.setItem('myCat', 'Tom');
// localStorage.getItem('myCat');
// localStorage.removeItem('myCat');

const YOUR_REDIRECT_URI = process.env.YOUR_REDIRECT_URI;
const CONSUMER_KEY = process.env.CONSUMER_KEY;

console.log('CONSUMER_KEY', CONSUMER_KEY);

const Home = () => {

  const www = () => {
    axios.post(
      '/proxyApi/oauth/request',
      {
        consumer_key: CONSUMER_KEY,
        redirect_uri: YOUR_REDIRECT_URI,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Accept': 'application/json',
        },
      }
    )
    .then(function (response) {
      const { data: { code} } = response;
      // console.log('data', data);

      localStorage.setItem('userCode', code)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const zzz = () => {
    const requestToken = localStorage.getItem('userCode');
    const url = `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${YOUR_REDIRECT_URI}`;
    window.location.href = url;
  }

  const yyy = () => {
    const requestToken = localStorage.getItem('userCode');

    axios.post(
      '/proxyApi/oauth/authorize',
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
    .then(function (response) {
      const {
        data: {
          access_token: accessToken,
          username,
        },
      } = response;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);

      // console.log('data', data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const aaa = () => {
    const accessToken = localStorage.getItem('accessToken');

    axios.post(
      '/proxyApi/get',
      {
        consumer_key: CONSUMER_KEY,
        access_token: accessToken,
        state: 'unread'
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Accept': 'application/json',
        },
      }
    )
    .then(function (response) {
      const {
        data
      } = response;

      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('username', username);

      console.log('data', data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      Is working
      <button onClick={www}>1st get code from pocket api</button>
      <button onClick={zzz}>2 login</button>
      <button onClick={yyy}>3 get access token</button>
      <button onClick={aaa}>4 get data</button>
    </div>
  )
}

export default Home;
