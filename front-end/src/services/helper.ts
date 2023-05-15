import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { showLoading2s } from "../features/loadingSlicer";

export const goBackRouter = (dispatch: AppDispatch, navigate: NavigateFunction) => {
  showLoading2s(dispatch);
  setTimeout(() => {
    navigate(-1);
  }, 2000);
};

export const goNextRouter = (dispatch: AppDispatch, navigate: NavigateFunction, endPoint: string, state?: any) => {
  showLoading2s(dispatch);
  setTimeout(() => {
    if (state) {
      navigate(endPoint, { state: { ...state } });
    } else {
      navigate(endPoint);
    }
  }, 2000);
};
