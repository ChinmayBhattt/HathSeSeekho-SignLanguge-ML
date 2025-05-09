import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    if (isRegisterMode) {
      // Additional validation for registration
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // For demo purposes, simulate registration
      setTimeout(() => {
        // Store the new user data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ email, password, name });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login after registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name }));
        
        // Redirect to main page
        window.location.href = '/';
        
        setIsLoading(false);
      }, 1000);
    } else {
      // Login mode
      // For demo purposes, we'll check against the demo account or registered users
      setTimeout(() => {
        // Check built-in demo account
        if (email === 'demo@example.com' && password === 'password') {
          handleSuccessfulLogin({ email });
          return;
        }

        // Check against registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          handleSuccessfulLogin({ email: user.email, name: user.name });
        } else {
          setError('Invalid email or password');
          setIsLoading(false);
        }
      }, 1000);
    }
  };

  const handleSuccessfulLogin = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = '/';
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
  };

  const handleRegisterClick = () => {
    setShowRegistrationSuccess(true);
    setTimeout(() => {
      setShowRegistrationSuccess(false);
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Animated sign language hand elements */}
      <div className="hand-sign"></div>
      <div className="hand-sign"></div>
      <div className="hand-sign"></div>
      
      {showRegistrationSuccess && (
        <div className="registration-success">
          Registration successful! Redirecting...
        </div>
      )}
      <div className="login-form">
        <img src="/assets/logo/signlangugeImage.png" alt="Sign Language Logo" className="login-logo" />
        <div className="logo-text">
          <span>Sign</span>Language
        </div>
        
        {isRegisterMode ? (
          <h1>Create </h1>
        ) : (
          <div className="login-title">
            <div className="small-sign-in">Sign in to</div>
            <h1>HaathSeSeekho</h1>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div className="input-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={isRegisterMode}
              />
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {isRegisterMode && (
            <div className="input-group">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required={isRegisterMode}
              />
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading 
              ? (isRegisterMode ? 'Creating Account...' : 'Signing in...') 
              : (isRegisterMode ? 'Create Account' : 'Sign in')}
          </button>
        </form>
        
        <div className="register-link">
          <p>
            {isRegisterMode 
              ? 'Already have an account?' 
              : "Don't have an account?"}
            <a href="#" onClick={toggleMode}> 
              {isRegisterMode ? 'Sign in' : 'Register now'}
            </a>
          </p>
        </div>

        {!isRegisterMode && (
          <div className="mt-4 text-center text-gray-500 text-sm">
            <p>For demo, use:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('login-root');
const root = createRoot(rootElement);
root.render(<LoginPage />); 