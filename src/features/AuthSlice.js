import {createSlice} from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    value: false,
    email: "",
  },
  reducers: {
    login: (state, action) => {
      state.value = true;
      state.email = action.payload;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout} = AuthSlice.actions;

export default AuthSlice.reducer;
