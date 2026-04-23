import React, { useState, useContext, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErrorText('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return;
    }
    setErrorText('');
    setLoadingLocal(true);
    
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('/api/register', { name, email, password }, config);
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error) {
      setErrorText(error.response?.data?.message || 'Registration failed');
      toast.error('Could not create account');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Join us to report or find lost items.</p>
        
        {errorText && <div className="alert alert-danger py-2 px-3 text-sm border-0 rounded-3 mb-4">{errorText}</div>}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </Form.Group>

          <button type="submit" className="btn btn-primary btn-auth" disabled={loadingLocal}>
            {loadingLocal ? <Spinner animation="border" size="sm" /> : 'Create Account'}
          </button>
        </Form>
        <div className="mt-4 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" className="text-decoration-none fw-medium" style={{ color: 'var(--primary)' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
