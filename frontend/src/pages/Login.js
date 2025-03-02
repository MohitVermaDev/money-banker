import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../core/config';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      
      if (response.data.status) {
        dispatch(loginSuccess({ token: response.data.data.token })); // Store token in Redux
        navigate('/'); // Redirect to Dashboard after login
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials!')
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <svg viewBox="0 0 389.65517241379314 72.311549679091">
                <defs id="SvgjsDefs1191"></defs>
                <g id="SvgjsG1192" featurekey="2ou6gm-0" transform="matrix(0.17227013451959072,0,0,0.17227013451959072,5.6119936859558965,1.9719314739782874)" fill="#2b3595">
                    <path xmlns="http://www.w3.org/2000/svg" d="M128.82 224.53q-7.43-.25-9.31-.16-5.97.3-5.96-4.85.03-19.61 0-39.2 0-1.43 1.97-2.97c1.44-1.14 3.63-.69 5.28-1.53q20.08-10.26 137.84-71.05.46-.24.91 0l141.31 71.83a4.96 4.95 13.5 0 1 2.7 4.41v38.75a4.63 4.63 0 0 1-4.63 4.63h-11.11a.41.41 0 0 0-.41.41v120.94q0 .49.49.5 10.28.21 13.83.03 6.07-.3 5.85 5.98-.09 2.56.05 18.33 0 .5.51.5 7.77.01 19.85 0c4.36 0 5.7 1.57 5.71 5.76.01 11.39-.21 19.51.1 25.65q.28 5.82-6.05 5.82-49.13 0-339.66-.03a4.57 4.56 0 0 1-4.57-4.56v-28.43a4.17 4.16-90 0 1 4.16-4.17h21.34q.5 0 .51-.5.12-16.78.07-19.1c-.08-4.22 2.14-5.17 5.97-5.21q3.41-.03 13.43-.02a.33.32 90 0 0 .32-.33V225.04q0-.5-.5-.51m105.44-47.98c3.5.01 4.71 2.68 4.64 5.74q-.16 6.54.01 16.39.01.55.56.55h38.73q.5 0 .51-.49.19-7.49.02-17.02-.09-5.21 5.77-5.21 53.42-.01 88.07.06a.29.28-2.7 0 0 .29-.31q-.02-.28-.38-.46-49.45-25.22-112.26-57.08a2.44 2.41-44.9 0 0-2.21.01l-111.04 57.21q-1.28.66.16.65 32.94-.13 87.13-.04m-7.19 12.41a.43.43 0 0 0-.43-.43H125.78a.43.43 0 0 0-.43.43v22.8a.43.43 0 0 0 .43.43h100.86a.43.43 0 0 0 .43-.43zm164.68.02a.45.45 0 0 0-.45-.45H291a.45.45 0 0 0-.45.45v22.76a.45.45 0 0 0 .45.45h100.3a.45.45 0 0 0 .45-.45zm-152.97 31.55c-.18 2.19-1.96 3.66-3.94 3.73q-5.07.18-32.85.14a.35.35 0 0 0-.35.35v120.96a.58.57-90 0 0 .57.58h13.84q.64 0 .64-.64.04-12.07-.06-46.89c-.01-4.03 2.44-5.18 6.18-5.18q34.26-.01 68.51-.01c4.78 0 8.64-.39 8.61 5.43q-.11 23.4-.01 46.92 0 .38.37.38h13.98a.58.58 0 0 0 .58-.58V224.75a.35.35 0 0 0-.35-.35h-31.29a4.48 4.47 90 0 1-4.47-4.48v-7.98a.56.56 0 0 0-.56-.56h-38.86a.47.46 89.4 0 0-.46.48q.14 5.98-.08 8.67m-84.74 4.32a.46.46 0 0 0-.46-.46h-11.9a.46.46 0 0 0-.46.46v120.98a.46.46 0 0 0 .46.46h11.9a.46.46 0 0 0 .46-.46zm196.48-.05a.39.39 0 0 0-.39-.39h-23.04a.39.39 0 0 0-.39.39v121.12a.39.39 0 0 0 .39.39h23.04a.39.39 0 0 0 .39-.39zm25.09.06a.47.47 0 0 0-.47-.47h-12.28a.47.47 0 0 0-.47.47v120.96a.47.47 0 0 0 .47.47h12.28a.47.47 0 0 0 .47-.47zm-185.7-.02a.45.45 0 0 0-.45-.45h-23.14a.45.45 0 0 0-.45.45v120.98a.45.45 0 0 0 .45.45h23.14a.45.45 0 0 0 .45-.45zm98.27 81.46a.46.46 0 0 0-.46-.46H229a.46.46 0 0 0-.46.46v39.54a.46.46 0 0 0 .46.46h58.72a.46.46 0 0 0 .46-.46zm107.57 52.56a.44.44 0 0 0-.44-.44H121.77a.44.44 0 0 0-.44.44v11.8a.44.44 0 0 0 .44.44h273.54a.44.44 0 0 0 .44-.44zm26.16 24.95a.54.54 0 0 0-.54-.54H95.85a.54.54 0 0 0-.54.54v11.62a.54.54 0 0 0 .54.54h325.52a.54.54 0 0 0 .54-.54z"></path>
                    <path xmlns="http://www.w3.org/2000/svg" d="M278.56 156.34a20 20 0 0 1-20 20 20 20 0 0 1-20-20 20 20 0 0 1 20-20 20 20 0 0 1 20 20m-11.98-.07a8.08 8.08 0 0 0-8.08-8.08 8.08 8.08 0 0 0-8.08 8.08 8.08 8.08 0 0 0 8.08 8.08 8.08 8.08 0 0 0 8.08-8.08"></path>
                    <rect xmlns="http://www.w3.org/2000/svg" width="88.34" height="12.22" x="214" y="243.3" rx="3.93"></rect>
                    <rect xmlns="http://www.w3.org/2000/svg" width="88.28" height="12.32" x="214.02" y="268.15" rx="3.97"></rect>
                </g>
                <g id="SvgjsG1193" featurekey="kZnDdN-0" transform="matrix(1.926667416984568,0,0,1.926667416984568,97.68799992645447,20.82532861400686)" fill="#111111">
                    <path d="M15.78 6 l0 14 l-1.7 0 l0 -10.28 l-4.92 10.28 l-1.36 0 l-4.9 -10.26 l0 10.26 l-1.7 0 l0 -14 l1.64 0 l5.66 11.72 l5.64 -11.72 l1.64 0 z M25.04 5.800000000000001 c3.64 0 7.16 2.96 7.16 7.2 s-3.52 7.2 -7.16 7.2 c-3.66 0 -7.16 -2.96 -7.16 -7.2 s3.5 -7.2 7.16 -7.2 z M25.04 18.62 c2.74 0 5.44 -2.32 5.44 -5.62 s-2.7 -5.62 -5.44 -5.62 c-2.76 0 -5.44 2.32 -5.44 5.62 s2.68 5.62 5.44 5.62 z M44.06 6 l1.66 0 l0 14 l-1.28 0 l-8.48 -10.96 l0 10.96 l-1.66 0 l0 -14 l1.28 0 l8.48 10.98 l0 -10.98 z M49.78 18.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M70.04 6 l-5.22 7.54 l0 6.46 l-1.66 0 l0 -6.46 l-5.22 -7.54 l1.9 0 l4.14 6.02 l4.16 -6.02 l1.9 0 z M84.58 12.3 c1.84 0.42 3.04 1.94 3.04 3.7 c0 2.46 -1.6 4 -5.06 4 l-4.72 0 l0 -14 l4.78 0 c2.74 0 4.1 1.56 4.1 3.38 c0 1.34 -0.76 2.42 -2.14 2.92 z M82.5 7.48 l-3 0 l0 4.28 l3 0 c1.6 0 2.58 -0.88 2.58 -2.16 c0 -1.32 -0.92 -2.12 -2.58 -2.12 z M82.5 18.52 c2.4 0 3.46 -0.98 3.46 -2.66 c0 -1.46 -1.06 -2.72 -3.36 -2.72 l-3.1 0 l0 5.38 l3 0 z M100.83999999999999 20 l-1.44 -3.3 l-7.48 0 l-1.44 3.3 l-1.76 0 l6.24 -14 l1.38 0 l6.26 14 l-1.76 0 z M92.53999999999999 15.3 l6.24 0 l-3.12 -7.12 z M113.96000000000001 6 l1.66 0 l0 14 l-1.28 0 l-8.48 -10.96 l0 10.96 l-1.66 0 l0 -14 l1.28 0 l8.48 10.98 l0 -10.98 z M127.17999999999999 20 l-5.42 -6.54 l-2.04 2.22 l0 4.32 l-1.7 0 l0 -14 l1.7 0 l0 7.5 l6.82 -7.5 l2.08 0 l-5.82 6.34 l6.34 7.66 l-1.96 0 z M132.5 18.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M151.53999999999996 20 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M142.92 7.5600000000000005 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z"></path>
                </g>
            </svg>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            
            {error && <p className="text-danger text-center">{error}</p>}
            
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember"> Remember Me </label>
                  </div>
                </div>
                
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>

            {/* <p className="mb-1">
              <a href="/forgot-password">Forgot password?</a>
            </p> */}
            <p className="mb-0">
              <a href="/register" className="text-center">Register a new account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
