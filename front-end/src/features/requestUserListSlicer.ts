import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, store } from "../app/store";
import axios from "axios";
import { personalRequestListType } from "../model/types/requestList";
import { personalDetailType } from "../model/types/user";
import alluserSlicer from "./alluserSlicer";
import AllUsersList from "../components/confirm/step_1_selectList/all_user_list/AllUsersList";

interface intitalStateType {
  requestLists: Array<personalRequestListType>;
  selectedRequesList?: personalRequestListType;
}

const initialState: intitalStateType = {
  requestLists: [],
};

const requestListSlicer = createSlice({
  name: "userlistSlicer",
  initialState,
  reducers: {
    getALlRequestUserlist(
      state,
      action: PayloadAction<Array<personalRequestListType>>
    ) {
      state.requestLists = action.payload;
    },
    setUpSelectRequestList(state, action: PayloadAction<{ id: string }>) {
      const selectList = state.requestLists.find(
        (e) => e.id === action.payload.id
      );
      state.selectedRequesList = selectList;
    },
    removeUserFromSelectRequestList(state, action: PayloadAction<{ id: string }>) {
      if (state.selectedRequesList) {
        const index = state.selectedRequesList.userList.findIndex((e) => e === action.payload.id);
        state.selectedRequesList.userList.splice(index, 1);
      }
    },
    addUserFromSelectRequestList(state, action: PayloadAction<{ id: string; allUserList: Array<personalDetailType> }>) {},
    editSelectRequestList(
      state,
      action: PayloadAction<personalRequestListType>
    ) {
      state.selectedRequesList = action.payload;
    },
    resetFeedbackRequestList: () => {
      return { ...initialState };
    },
  },
});

export const getAllRequestUserListAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data, status } = await axios.get("/feedback/requested_feedback");
      if (status === 200) {
        dispatch(getALlRequestUserlist(data.data));
      }
    } catch (error) {}
  };
};

export const { getALlRequestUserlist, setUpSelectRequestList, addUserFromSelectRequestList, removeUserFromSelectRequestList,resetFeedbackRequestList } =
  requestListSlicer.actions;
// export const {
//   getALlRequestUserlist,
//   setUpSelectRequestList,
//   resetFeedbackRequestList,
// } = requestListSlicer.actions;
export default requestListSlicer.reducer;
