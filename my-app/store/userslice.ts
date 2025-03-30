"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  type: boolean;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuarios");

    return await res.json();
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuario");

    return await res.json();
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser: Omit<User, "id">, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error("Error al crear usuario");

    return await res.json();
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error("Error al actualizar usuario");

    return await res.json();
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");

    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener usuarios";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
