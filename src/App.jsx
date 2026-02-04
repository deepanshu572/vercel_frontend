import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NavBar from "./Pages/NavBar";
import AllProjects from "./Pages/AllProjects";
import CreateProjects from "./Pages/CreateProjects";
import ViewProject from "./Pages/ViewProject";

import ProtectRoute from "./ProtectRoute.jsx";
import { useAuth } from "./authContext";
export const serverUrl = "https://vercel-backend-six-dun.vercel.app/";
const App = () => {
  const { user } = useAuth();

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<AllProjects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectRoute>
              <AllProjects />
            </ProtectRoute>
          }
        />
        <Route
          path="/CreateProjects"
          element={
            <ProtectRoute>
              <CreateProjects />
            </ProtectRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectRoute>
              <ViewProject />
            </ProtectRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
