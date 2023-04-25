import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import Userdash from "./pages/userdash/Userdash";
import Admindash from "./pages/admindash/Admindash";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/userdash" element={<Userdash />} />
        <Route path="/admindash" element={<Admindash />} />
        <Route path="/feedback" element={<Form />} />
      </Route>
    </Routes>
  );
};

export default App;
