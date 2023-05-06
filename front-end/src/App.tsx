import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import Userdash from "./pages/userdash/Userdash";
import Admindash from "./pages/admindash/Admindash";

import FeedbackForm from "./components/form/FeedbackForm";
import CreatedUserList from "./components/confirm/CreateUserList";
import AllFeedbacks from "./components/allfeedbacks/AllFeedbacks";
import { ADMIN_ROLE } from "./common/constants";
import { useEffect } from "react";
import { initiateValidateSession } from "./features/authenticatedUserSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import RequestFeedback from "./pages/userdash/RequestFeedback";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("validate user");
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
            <Route path="feedbackform" element={<FeedbackForm />} />
            <Route path="selectUser" element={<CreatedUserList />} />
            {/* <Route path="confirmation" element={<CreateFeedback />} /> */}
            <Route path="/allfeedbacks" element={<AllFeedbacks />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Userdash />} />
            <Route path="/requestfeedback" element={<RequestFeedback />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      );
    }
  } else {
    return (
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }
};

export default App;
