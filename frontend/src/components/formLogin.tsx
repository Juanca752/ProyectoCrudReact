// src/components/FormLogin.tsx
import { useState } from "react";
import { useAuth } from "./auth";

export default function FormLogin() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  }

  async function handleClick() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            value={pass}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
