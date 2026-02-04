import React, { useState } from "react";
import { serverUrl } from "../App";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";

const Register = () => {
   const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const result = await axios.post(
      serverUrl + "/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result.data);
     setUser(result.data); 
      navigate("/");
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          Create Account
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
