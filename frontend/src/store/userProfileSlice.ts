import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define la estructura del perfil de usuario
interface UserProfile {
  name: string;
  age: number;
  fitnessGoal: string;
  [key: string]: any; // Para permitir otros campos si es necesario
}

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// Fetch de perfil de usuario
export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async ({ user_id, token }: { user_id: string; token: string }) => {
    const response = await fetch(
      `http://localhost:3000/api/users/${user_id}/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener el perfil del usuario");
    }

    return await response.json();
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default userProfileSlice.reducer;
