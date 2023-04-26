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
import { ADMIN_ROLE } from "./common/constants";
import { useEffect } from "react";
import { initiateValidateSession } from "./features/authenticatedUserSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initiateValidateSession());
  }, [dispatch]);
  const authenticatedUser = useAppSelector((state) => state.authenticatedUser);

  if (authenticatedUser.isLoading) {
    return <p>Loading....!!</p>;
  }

  if (authenticatedUser.isLoggedIn) {
    if (authenticatedUser.userDetails?.roles.includes(ADMIN_ROLE)) {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Admindash />} />
            <Route path="/feedbackform" element={<FeedbackForm1 />} />
            <Route path="/conformation" element={<Conformation />} />
            <Route path="/allfeedbacks" element={<AllFeedbacks />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Userdash />} />
          </Route>
        </Routes>
      );
    }
  } else {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    );
  }
};

export default App;
