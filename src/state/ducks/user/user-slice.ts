import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { USER_PROFILES } from "./constants";
import { User } from "./types";

const userInitialState: User = USER_PROFILES[0];

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    change: (state, { payload }: PayloadAction<User>) => {
      // immer allows this mutation
      // otherwise, we would have to spread to new object
      const { id, name, profileImage } = payload;

      state.id = id;
      state.name = name;
      state.profileImage = profileImage;
      // state = payload;  //this also works
    },
    // don't need to provide default case
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
