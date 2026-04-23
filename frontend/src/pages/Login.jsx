import React, { useState, useContext, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText('Please fill in all fields');
      return;
    }
    setErrorText('');
    setLoadingLocal(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/login', { email, password }, config);
      loginUser(data);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      setErrorText(error.response?.data?.message || 'Invalid credentials');
      toast.error('Login failed');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your account to continue</p>
        
        {errorText && <div className="alert alert-danger py-2 px-3 text-sm border-0 rounded-3 mb-4">{errorText}</div>}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <Form.Control
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="mb-0">Password</Form.Label>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form.Group>

          <button type="submit" className="btn btn-primary btn-auth" disabled={loadingLocal}>
            {loadingLocal ? <Spinner animation="border" size="sm" /> : 'Sign In'}
          </button>
        </Form>
        <div className="mt-4 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" className="text-decoration-none fw-medium" style={{ color: 'var(--primary)' }}>Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
