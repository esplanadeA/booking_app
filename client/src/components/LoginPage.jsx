import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('false');

  const {setUser} = UserContext(UserContext);

  async function handleLoginSummit(event) {
    event.preventDefault();
    try {
      const userInfo = await axios.post('/login', {
        email,
        password,
      });
      setUser(userInfo);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed. Please try again later');
    }
  }
  if (redirect) {
    return <div>yeah</div>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSummit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            have an account yet?
            <Link className="underline text-black" to={'/register'}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
