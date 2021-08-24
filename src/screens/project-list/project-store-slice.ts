import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface drawerVisibleProps {
  drawerVisible: boolean;
}

const initDrawerVisible: drawerVisibleProps = {
  drawerVisible: false,
};

export const projectListSlice = createSlice({
  name: "projectList",
  initialState: initDrawerVisible,
  reducers: {
    changeDrawerVisible: (state, action) => {
      state.drawerVisible = action.payload;
    },
  },
});

export const { changeDrawerVisible } = projectListSlice.actions;
export default projectListSlice.reducer;
