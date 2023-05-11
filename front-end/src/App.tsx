import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import Userdash from "./pages/userdash/Userdash";
import Admindash from "./pages/admindash/Admindash";
import AnswerFeedback from "../src/pages/userdash/feedbackform/Feedbackform";
import FeedbackForm from "./components/form/FeedbackForm";
import AllFeedbacks from "./components/allfeedbacks/allFeeback/AllFeedbacks";
import { ADMIN_ROLE } from "./common/constants";
import { useEffect } from "react";
import { initiateValidateSession } from "./features/authenticatedUserSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import RequestFeedback from "./pages/userdash/RequestFeedback";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SetupUserList from "./components/confirm/step_2_modify_the_list/SetupUserList";
import { initiateFetchNotifications } from "./features/notificationsSlice";
import { Notifications } from "./components/Notifications/Notifications";
import CreateFeedback from "./components/createFeedback/CreateFeedback";
import RequestUserLists from "./components/confirm/step_1_selectList/all_requested_user_list/RequestUserLists";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import CreateUserList from "./components/confirmation/CreateUserList";
import FinalConfirm from "./components/confirm/step_3_finalconfirm/FinalConfirm";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initiateValidateSession());
  }, [dispatch]);
  const authenticatedUser = useAppSelector((state) => state.authenticatedUser);
  const notifications = useAppSelector((state) => state.userNotifications.notifications);

  if (authenticatedUser.isLoading) {
    return <LoadingPage />;
  }

  if (authenticatedUser.isLoggedIn) {
    if (!notifications) {
      dispatch(initiateFetchNotifications());
    }
    if (authenticatedUser.userDetails?.roles.includes(ADMIN_ROLE)) {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Admindash />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="feedbackform" element={<FeedbackForm />} />
            <Route path="feedbackform/confirm" element={<CreateFeedback />} />
            <Route path="/confirmation" element={<CreateUserList />} />
            <Route path="/getuserlist">
              <Route index element={<RequestUserLists />} />
              <Route path=":id" element={<SetupUserList />} />
              {/* <Route path=":id/feedbackform" element={<FeedbackForm />} /> */}
              <Route path=":id/confirm" element={<FinalConfirm />} />
            </Route>
            <Route path="allfeedbacks" element={<AllFeedbacks />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Userdash />} />
            {/* <Route path="feedback" element={<FeedbackForm />} /> */}
            <Route path="feedbackform" element={<AnswerFeedback />} />
            <Route path="notifications" element={<Notifications />} />
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
