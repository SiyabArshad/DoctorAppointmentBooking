import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getsingledoc } from "../../helpers/firebasefunctions/firebasefuncs";

const initialState = {
  isLoading: false,
  profile: null,
};

//get profile data
export const fetchOwnProfile = createAsyncThunk(
  "profile/fetchOwnProfile",
  async (id) => {
    try {
      const user = await getsingledoc("users", id);
      return user?.data();
    } catch (error) {
      console.error("Error fetching own profile:", error);
      throw error;
    }
  }
);

//end

const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOwnProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchOwnProfile.rejected, (state) => {
        state.isLoading = false;
        // Handle error if needed
      });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
