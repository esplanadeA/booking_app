import React from 'react';
import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
