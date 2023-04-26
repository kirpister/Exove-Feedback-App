import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import Userdash from "./pages/userdash/Userdash";
import Admindash from "./pages/admindash/Admindash";
//import Form from "./pages/feedback/Form";
import FeedbackForm1 from "./components/form/FeedbackForm1";
import Conformation from "./components/form/Conformation";
import AllFeedbacks from "./components/form/AllFeedbacks";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" exact={true} element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="userdash" element={<Userdash />} />
        <Route path="/admindash" element={<Admindash />}>
          <Route path="feedbackform" element={<FeedbackForm1 />} />
          <Route path="conformation" element={<Conformation />} />
          <Route path="allfeedbacks" element={<AllFeedbacks />} />
        </Route>
      </Route> */}

      <Route path="/" element={<Layout />} />
      <Route index element={<Login />} />
      <Route path="userdash" element={<Userdash />} />
      <Route path="admindash" element={<Admindash />} />
      <Route path="admindash/feedbackform" element={<FeedbackForm1 />} />
      <Route path="admindash/conformation" element={<Conformation />} />
      <Route path="admindash/allfeedbacks" element={<AllFeedbacks />} />
    </Routes>
  );
};

export default App;
