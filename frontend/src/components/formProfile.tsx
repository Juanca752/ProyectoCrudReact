import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchUserProfile } from "../store/userProfileSlice";
import { useAuth } from "./auth";

export default function FormProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.userProfile
  );

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const user_id = decodedToken.id;

        dispatch(fetchUserProfile({ user_id, token }) as any);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [dispatch, token]);

  if (!token) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  if (loading) return <div>Loading...</div>;

  // Convertir error a número si es una cadena
  const errorCode = typeof error === "string" ? Number(error) : error;

  // Si hay un error y no es un 404, mostrar el mensaje de error
  if (errorCode && errorCode !== 404)
    return <div>Error al cargar el perfil.</div>;

  // Determinar si el formulario debe mostrarse con valores vacíos (error 404) o con los valores del perfil
  const showEmptyForm = errorCode === 404;

  return (
    <form className="w-full max-w-lg bg-white rounded-2xl">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label className="block text-sm font-bold mb-2">Age</label>
          <input
            name="age"
            type="number"
            className="w-full border rounded py-2 px-3"
            defaultValue={showEmptyForm ? "" : profile?.age}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label className="block text-sm font-bold mb-2">Weight (kg)</label>
          <input
            name="weight"
            type="number"
            className="w-full border rounded py-2 px-3"
            defaultValue={showEmptyForm ? "" : profile?.weight}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label className="block text-sm font-bold mb-2">Height (cm)</label>
          <input
            name="height"
            type="number"
            className="w-full border rounded py-2 px-3"
            defaultValue={showEmptyForm ? "" : profile?.height}
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block text-sm font-bold mb-2">Fitness Goal</label>
          <input
            name="fitness-goal"
            type="text"
            className="w-full border rounded py-2 px-3"
            defaultValue={showEmptyForm ? "" : profile?.fitnessGoal}
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block text-sm font-bold mb-2">Gender</label>
          <select name="gender" className="w-full border rounded py-2 px-3">
            <option
              value="Male"
              selected={!showEmptyForm && profile?.gender === "Male"}
            >
              Male
            </option>
            <option
              value="Female"
              selected={!showEmptyForm && profile?.gender === "Female"}
            >
              Female
            </option>
            <option
              value="Other"
              selected={!showEmptyForm && profile?.gender === "Other"}
            >
              Other
            </option>
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
}
