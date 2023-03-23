import React from 'react';
import './login.css';
import circle from '../../../assets/cirle-half.png';

const Login: React.FC = () => {

    return (
        <div className="wrapper">
        <div><img className="circle" src={circle} alt="cirlce"/></div>  
    
        <div className="login-form">
        <h2>LOGIN</h2>
    
        <div>
        <label htmlFor="name">Email:</label>
        <input type='text' placeholder='Email'/> 
        </div>
    
        <div>
        <label htmlFor="name">Password:</label>
        <input type='password' placeholder='Password' /> 
        </div>
    
        <button className="login-btn">LOGIN</button>
    
        
        </div>
        </div>
    );
};

export default { Login };