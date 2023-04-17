import React from 'react';
import circle from '../../assets/circle-half.png';
import './admindash.css';

const SidebarAdmin: React.FC = () => {
    return (
        <div>
            <nav>
            <ul>
                <img className="circle" src={circle} alt="circle"/>
                <li>Whatever</li>
                <li>Feedback Requests</li>
            </ul>
            
            <button></button>
            </nav>
        </div>
    );
};

export default SidebarAdmin;