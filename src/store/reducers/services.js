import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDocs,
  getDocsByUserId,
} from "../../helpers/firebasefunctions/firebasefuncs";

const initialState = {
  services: [],
  loading: false,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    try {
      const services = await getAllDocs("services");
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }
);

export const fetchServicesByUserId = createAsyncThunk(
  "services/fetchServicesByUserId",
  async (userId) => {
    try {
      const services = await getDocsByUserId("services", userId);
      return services;
    } catch (error) {
      console.error("Error fetching services by user ID:", error);
      throw error;
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
        // Handle error if needed
      })
      .addCase(fetchServicesByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServicesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServicesByUserId.rejected, (state) => {
        state.loading = false;
        // Handle error if needed
      });
  },
});

export default servicesSlice.reducer;
