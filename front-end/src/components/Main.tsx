import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../pages/admindash/SidebarAdmin';

const Main: React.FC = () => {

    return (
      <main className="admindash_wrapper">
        <Outlet />
      </main>
    );
};

export default Main;