import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBookingsByUserId } from "../../helpers/firebasefunctions/firebasefuncs";

const initialState = {
  bookings: [],
  loading: false,
};

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ id, admin }) => {
    try {
      const data = await getBookingsByUserId(id, admin);
      return data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.loading = false;
        // Handle error if needed
      });
  },
});

export default bookingSlice.reducer;
