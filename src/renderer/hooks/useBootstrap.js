/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from 'renderer/context/UserProvider';

import useFetch from './useFetch';

const useBootstrap = () => {
  const { updateCredentials, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getUser = useCallback(
    (token) => {
      useFetch('/user/profile', 'GET', `session[token]=${token}`).then(
        (res) => {
          updateUser(res.current_user);
        }
      );
    },
    [updateUser]
  );

  const getCredentials = useCallback(
    (token) => {
      useFetch('/credentials', 'GET', `session[token]=${token}`).then((res) => {
        updateCredentials(res.credentials);
      });
    },
    [updateCredentials]
  );

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
          getUser(token);
          getCredentials(token);

          navigate('/home');
        } else {
          navigate('/login');
        }
      })();
    }, 1000);
  }, []);
};

export default useBootstrap;
