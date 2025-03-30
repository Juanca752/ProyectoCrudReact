import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Trainer {
  id: number;
  name: string;
  email: string;
  bio: string;
  experience_years: number;
}

interface TrainerState {
  trainers: Trainer[];
  selectedTrainer: Trainer | null;
  loading: boolean;
  error: string | null;
}

const initialState: TrainerState = {
  trainers: [],
  selectedTrainer: null,
  loading: false,
  error: null,
};

export const fetchTrainers = createAsyncThunk(
  "trainers/fetchTrainers",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch("http://localhost:3000/api/trainers", {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener entrenadores");

    return await res.json();
  }
);

export const getTrainerById = createAsyncThunk(
  "trainers/getTrainerById",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(`http://localhost:3000/api/trainers/${id}`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener entrenador");

    return await res.json();
  }
);

export const createTrainer = createAsyncThunk(
  "trainers/createTrainer",
  async (newTrainer: Omit<Trainer, "id">, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch("http://localhost:3000/api/trainers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(newTrainer),
    });

    if (!res.ok) throw new Error("Error al crear entrenador");

    return await res.json();
  }
);

export const updateTrainer = createAsyncThunk(
  "trainers/updateTrainer",
  async (trainer: Trainer, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(
      `http://localhost:3000/api/trainers/${trainer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify(trainer),
      }
    );

    if (!res.ok) throw new Error("Error al actualizar entrenador");

    return await res.json();
  }
);

export const deleteTrainer = createAsyncThunk(
  "trainers/deleteTrainer",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    if (!state.auth.token) throw new Error("No autorizado");

    const res = await fetch(`http://localhost:3000/api/trainers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Error al eliminar entrenador");

    return id;
  }
);

const trainerSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {
    setSelectedTrainer: (state, action) => {
      state.selectedTrainer = action.payload;
    },
    clearSelectedTrainer: (state) => {
      state.selectedTrainer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener entrenadores";
      })
      .addCase(getTrainerById.fulfilled, (state, action) => {
        state.selectedTrainer = action.payload;
      })
      .addCase(createTrainer.fulfilled, (state, action) => {
        state.trainers.push(action.payload);
      })
      .addCase(updateTrainer.fulfilled, (state, action) => {
        state.trainers = state.trainers.map((trainer) =>
          trainer.id === action.payload.id ? action.payload : trainer
        );
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.trainers = state.trainers.filter(
          (trainer) => trainer.id !== action.payload
        );
      });
  },
});

export const { setSelectedTrainer, clearSelectedTrainer } =
  trainerSlice.actions;
export default trainerSlice.reducer;
