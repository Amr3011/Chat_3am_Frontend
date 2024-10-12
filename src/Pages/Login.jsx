import logo from '../assets/Logo.png'; 
import leftImage from '../assets/Login_photo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userSlice';
import { useState } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Send a POST request to the backend for login
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        
        // Handle successful login
        const { token, user } = response.data;
        
        // Optionally store the token in local storage
        localStorage.setItem('token', token);
        
        // Dispatch login action with user data
        dispatch(login(user));
        
        // Navigate to home or dashboard
        navigate('/');
      } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } else {
      toast.error('Please enter valid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left side */}
      <div className="flex w-full lg:w-1/2 bg-primary p-8 lg:p-12 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img src={leftImage} alt="Welcome Image" className="w-2/3 lg:w-3/4 mb-6 lg:mb-8" />
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">Welcome To Chat Community</h1>
          <p className="text-sm lg:text-lg text-center">This website to cover all people against world to talk with each others</p>
        </div>
      </div>

      {/* Right side (Login form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <img src={logo} alt="Logo" className="w-10 lg:w-16" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Login</h2>
        <p className="text-sm mb-4 lg:mb-6">Login to access your account</p>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-neutral">Email</label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-neutral">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <a href="#" className="text-sm text-primary hover:underline">Forgot Password</a>
        </div>

        <button onClick={handleLogin} className="btn btn-primary w-full h-12 text-lg mb-4">Login</button>

        <div className="text-center">
          <p>Dont have an account?
            <Link to="/register" className="text-primary hover:underline"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
