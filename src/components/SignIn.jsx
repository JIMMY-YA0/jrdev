import axios from 'axios';
import { useUserContext } from '../Hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import UserContext from '../context/UserInfo';
function SignIn() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const data = { email, password };
    handlePost(data);
  };

  const handlePost = async user => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/user/login',
        user
      );
      handleLogin(res.data.status, res.data.token, res.data.id);
    } catch (error) {
      handleLogin();
      console.log('err', error);
    }
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleLogin = (info, token, userId) => {
    if (info === 'succses') {
      setSuccessMessage('success');
      setSuccess(true);
      setIsLoggedIn(true);
      localStorage.setItem('authToken', token);
      navigate('/userdashboard');
    } else {
      setSuccessMessage('Invalid Email or Password1');
      setSuccess(false);
    }
  };

  return (
    <div className="text-center center">
      <div className="signin">
        <div className="form-signin w-100 m-auto gap-3">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control rounded-0 rounded-top "
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleEmail}
                value={email}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control rounded-0 rounded-bottom"
                id="floatingPassword"
                placeholder="Password"
                onChange={handlePassword}
                value={password}
              />
              <label htmlFor="floatingPassword">Password</label>
              <p className={success ? 'text-success' : 'text-danger'}>
                {successMessage}
              </p>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
