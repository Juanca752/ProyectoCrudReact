import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  fetchUsers,
  deleteUser,
  getUserById,
  setSelectedUser,
} from "../store/userSlice";
import FormUser from "./formUser";

export default function ListUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, selectedUser } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleDelete(id: number) {
    dispatch(deleteUser(id));
  }

  function handleEdit(id: number) {
    dispatch(getUserById(id));
  }

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-4/5">
      <table className="table-auto bg-white border-collapse w-full [&_th]:px-6 [&_th]:py-3 [&_td]:px-6 [&_td]:py-3">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type ? "Admin" : "Usuario"}</td>
              <td>
                <button
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>
                  <AiFillDelete className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser !== undefined && <FormUser />}
    </div>
  );
}
