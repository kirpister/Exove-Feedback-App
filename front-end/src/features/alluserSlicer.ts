import { personalDetailType } from "../model/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { updateAllUserList, createUserList } = allUserSlicer.actions;
export default allUserSlicer.reducer;
