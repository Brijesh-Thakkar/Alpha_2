import React from 'react';
import './FirstPage.css';
import { useNavigate } from 'react-router-dom';


const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
    navigate('/Signup');
  };
    const handleLoginClick = () => {
        navigate('/Login');
    }
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>smo ocal</h1>
        </div>
        
        <nav className="navigation">
          <a href="#overview">Overview</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About Us</a>
        </nav>
        
        <div className="header-buttons">
          <button className="header-login-button" onClick={handleLoginClick}>Login</button>
          <button className="header-signup-button" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <h4 className="main-title">
            One place, full pace your business, your space.
          </h4>
          
          <div className="description">
            <p>Send personalized messages to loyal buyers.</p>
            <p>They order online, you deliver, and your profits grow.</p>
          </div>
          
          <div className="button-group">
            <button className="lets-begin" onClick={handleSignupClick}>Let's begin</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FirstPage;