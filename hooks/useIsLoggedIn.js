import { useEffect, useState } from 'react';
import { pocket } from '../helpers';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(pocket.getIsUserLoggedIn());
  }, []);

  useEffect(() => {
    const userDataChange = () => {
      const curIsLoggedIn = pocket.getIsUserLoggedIn();

      if(curIsLoggedIn !== isLoggedIn) {
        setIsLoggedIn(curIsLoggedIn);
      }
    };

    window.addEventListener('requestTokenChange', userDataChange);
    window.addEventListener('accessTokenChange', userDataChange);
    window.addEventListener('usernameChange', userDataChange);

    return () => {
      window.removeEventListener('requestTokenChange', userDataChange);
      window.removeEventListener('accessTokenChange', userDataChange);
      window.removeEventListener('usernameChange', userDataChange);
    };
    
  }, [isLoggedIn]);

  return isLoggedIn;
};
