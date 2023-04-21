import React from "react";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <main>
      <Outlet />
      maria
      <h1>test</h1>
    </main>
  );
};

export default Main;
