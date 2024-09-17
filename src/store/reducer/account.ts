import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Account, Rate } from "types";
import fetchJSON from "utils/fetchJson";

// Create the async thunk for fetching client data
export const getAccountsAsync = createAsyncThunk<Account[], void>("accounts/getAccounts", async () => {
  const response = await fetchJSON(`${process.env.PUBLIC_URL}/api/account.json`);
  const data: Account[] = await response.data;
  return data;
});

export const getRatesAsync = createAsyncThunk<Rate[], void>("accounts/getRates", async () => {
  const response = await fetchJSON(`${process.env.PUBLIC_URL}/api/fixed_rates.json`);
  const data: Rate[] = await response.data;
  return data;
});

//store
interface AccountsState {
  accounts: Account[];
  rateOptions: Rate[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [] as Account[],
  rateOptions: [] as Rate[],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountsAsync.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getAccountsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch data";
      })
      .addCase(getRatesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRatesAsync.fulfilled, (state, action: PayloadAction<Rate[]>) => {
        state.loading = false;
        state.rateOptions = action.payload;
      })
      .addCase(getRatesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch data";
      });
  },
});

// Export the reducer
export default accountsSlice.reducer;
