import type { UserProfile } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  profile: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const MOCK_PROFILE: UserProfile = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatarUrl: "https://picsum.photos/seed/user1/200/200",
  joinedAt: "2024-01-15",
};

export const fetchProfile = createAsyncThunk<UserProfile>(
  "user/fetchProfile",
  async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));
    return MOCK_PROFILE;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load profile";
      });
  },
});

export default userSlice.reducer;
