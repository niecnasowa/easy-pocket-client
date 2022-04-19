import { Pocket } from '../helpers'; 

const pocket = new Pocket();

const Home = () => {
  return (
    <div>
      <button onClick={pocket.getUserCode}>Get User Code</button>
      <button onClick={pocket.redirectToPocketLogin}>Pocket Login</button>
      <button onClick={pocket.getUserAccessToken}>Get access token</button>
      <button onClick={pocket.getData}>4 get data</button>
    </div>
  );
};

export default Home;
