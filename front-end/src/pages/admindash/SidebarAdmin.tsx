import React from 'react';
import circle from '../../assets/circle-half.png';

const SidebarAdmin: React.FC = () => {
    return (
        <div>
            <nav>
            <ul>
                <img className="circle" src={circle} alt="circle"/>
                <li>Whatever</li>
                <li>Feedback Requests</li>
            </ul>
            </nav>
        </div>
    );
};

export default SidebarAdmin;