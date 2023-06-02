/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useState } from 'react';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState([]);

  const updateUser = useCallback((val) => {
    setUser({ ...val });
  }, []);

  const updateCredentials = (val) => {
    setCredentials([...val]);
  };

  const nullUser = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        credentials,
        updateUser,
        nullUser,
        updateCredentials,
        setCredentials,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
