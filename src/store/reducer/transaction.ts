import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "types";
import fetchJSON from "utils/fetchJson";

// Create the async thunk for fetching transaction data
export const getTransactionsAsync = createAsyncThunk<Transaction[], void>("transactions/getTransactions", async () => {
  const response = await fetchJSON(`${process.env.PUBLIC_URL}/api/transaction.json`);
  const data: Transaction[] = await response.data;
  return data;
});

//store
interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [] as Transaction[],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsAsync.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch data";
      });
  },
});

// Export the reducer
export default transactionsSlice.reducer;
