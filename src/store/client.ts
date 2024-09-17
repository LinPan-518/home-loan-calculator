import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ClientData, DirectionType } from "types";
import fetchJSON from "utils/fetchJson";
import { getCurrencySymbol } from "utils/currencyHelper";

// Create the async thunk for fetching client data
export const getClientAsync = createAsyncThunk<ClientData, void>(
  "client/getClient",
  async () => {
    const response = await fetchJSON(
      `${process.env.PUBLIC_URL}/api/client.json`,
    );
    const data: ClientData = await response.data;
    return data;
  },
);

//store
interface ClientState {
  client: ClientData;
  loading: boolean;
  error: string | null;
  currencySymbol: string;
  currencyDirection: DirectionType;
}

const initialState: ClientState = {
  client: {} as ClientData,
  loading: false,
  error: null,
  currencySymbol: "$",
  currencyDirection: "LTR",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClientAsync.fulfilled,
        (state, action: PayloadAction<ClientData>) => {
          state.loading = false;
          state.client = action.payload;
          const { symbol, direction } = getCurrencySymbol(
            action.payload.currency,
          ); // Default to null if not found
          state.currencySymbol = symbol;
          state.currencyDirection = direction;
        },
      )
      .addCase(getClientAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch client data";
      });
  },
});

// Export the reducer
export default clientSlice.reducer;

// Other optional exports
// export const selectSymbol = (state: { client: ClientState }) => state.client.currencySymbol;
// export const selectDirection = (state: { client: ClientState }) => state.client.currencyDirection;
