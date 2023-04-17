import React from 'react';
import './userdash.css';
import circle from '../../assets/circle-half.png';

const SidebarUser: React.FC = () => {
    return (
        <>
       
        <nav>
           
            <ul>
            
                <img className="circle" src={circle} alt="circle"/>
                <li>Whatever</li>
                <li>Request Feedback</li>
               
            </ul>
           
            <button></button>
        
        </nav>
        </>
    );
};

export default SidebarUser;