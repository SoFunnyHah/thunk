import axios from 'axios';
import React, {
  createContext, useState, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/actions/userActions';

const UserContext = createContext();

const dispatch = useDispatch();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signupHandler = (e, inputs) => {
    e.preventDefault();
    axios.post('/api/user/signup', inputs)
      .then((res) => setUser(res.data))
      .catch(console.log);
  };

  const loginHandler = (e, inputs) => {
    e.preventDefault();
    axios.post('/api/user/login', inputs)
      .then((res) => {
        setUser(res.data);
        dispatch(setAuthUser(res.data));
      })
      .catch(console.log);
  };

  const logoutHandler = () => {
    axios('/api/user/logout')
      .then(() => setUser({}))
      .catch(console.log);
  };

  const sendUser = useMemo(() => ({
    user, signupHandler, loginHandler, logoutHandler,
  }), [
    user, signupHandler, loginHandler, logoutHandler,
  ]);
  return (
    <UserContext.Provider value={sendUser}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
