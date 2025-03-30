import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

const MainNavigation: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(""); // Limpiar token al cerrar sesión
    navigate("/"); // Redirigir al login
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="text-xl font-bold text-blue-300">
          Home
        </NavLink>
        {token && (
          <>
            <NavLink to="/users" className="text-lg hover:text-blue-300">
              Users
            </NavLink>
            <NavLink to="/profile" className="text-lg hover:text-blue-300">
              Profile
            </NavLink>
            <NavLink to="/trainers" className="text-lg hover:text-blue-300">
              Trainers
            </NavLink>
          </>
        )}
      </div>

      <div>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
