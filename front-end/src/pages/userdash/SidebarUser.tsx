import React from 'react';
import './userdash.css';
import circle from '../../assets/circle-half.png';

const SidebarUser: React.FC = () => {
    return (
        <>
       
        <nav>
           
            <ul>
            
                <img className="circle" src={circle} alt="circle"/>
                <li>Feedback Requests</li>
                <li>Request Feedback</li>
               
            </ul>
           
        </nav>

        <div className='bottom-div'>
            <span>Logged in as</span>
            <button></button>
        </div>
        </>
    );
};

export default SidebarUser;