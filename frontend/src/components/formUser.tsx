import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  createUser,
  updateUser,
  clearSelectedUser,
  getUserById,
} from "../store/userSlice";
import { useState, useEffect } from "react";

export default function FormUser() {
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState(selectedUser?.name || "");
  const [email, setEmail] = useState(selectedUser?.email || "");
  const [type, setType] = useState(selectedUser?.type || false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setType(selectedUser.type);
    }
  }, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, email, type, password };

    if (selectedUser) {
      await dispatch(updateUser({ ...userData, id: selectedUser.id }));
    } else {
      await dispatch(createUser(userData));
    }

    setName("");
    setEmail("");
    setType(false);
    setPassword("");
    dispatch(clearSelectedUser());
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setType(false);
    setPassword("");
    dispatch(clearSelectedUser());
  };

  return (
    <form
      className="mt-5 p-5 bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
      </h2>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-gray-300 p-2"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-900">
          Nombre
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-md border-gray-300 p-2"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-900">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-gray-300 p-2"
        />
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={type}
          onChange={(e) => setType(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-900">
          Administrador
        </label>
      </div>

      <div className="mt-4 flex justify-between">
        {selectedUser && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold text-gray-900"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {selectedUser ? "Editar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
}
