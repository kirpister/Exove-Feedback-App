import React from 'react';
import SidebarAdmin from './SidebarAdmin';

const Admindash: React.FC = () => {
    return (
        <>
        <SidebarAdmin />
        
        <div className='dash-wrapper'>
            <h2>Welcome Admin</h2>
        </div>
        </>
    );
};

export default Admindash;