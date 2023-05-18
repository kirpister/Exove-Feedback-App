import { DataType, personalDetailType } from "../model/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import axios from "axios";
interface UserListType {
  allUserList: Array<personalDetailType>;
  userListId: Array<string>;
}
const initialState: UserListType = {
  allUserList: [],
  userListId: [],
};

const allUserSlicer = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    updateAllUserList(state, action: PayloadAction<personalDetailType[]>) {
      state.allUserList = action.payload;
    },
    createUserList(state, action: PayloadAction<Array<string>>) {
      state.userListId = action.payload;
    },
    resetUserList: () => {
      return { ...initialState};
    },
  },
});

export const getAllUserAPI = () => {
  return async (dispatch: AppDispatch) => {
    axios.get<personalDetailType[]>("/api/user/get_all_user").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        dispatch(updateAllUserList(data.data));
      }
    });
  };
};

export const { updateAllUserList, createUserList, resetUserList } = allUserSlicer.actions;
export default allUserSlicer.reducer;
