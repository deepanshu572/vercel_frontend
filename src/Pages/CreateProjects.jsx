import React from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const navigation = useNavigate();
 const handleCreateProject = async (e) => {
  e.preventDefault();

  try {
    const result = await axios.post(
      serverUrl + "/api/project/create",
      {
        title,
        description,
      },
      {
        withCredentials: true,
      }
    );
    navigation("/");

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="flex w-full max-md:px-2 mt-[4.1rem]  ">
      {/* <SideNav /> */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleCreateProject}
          className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Projects
          </h2>

          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="title"
            required
          />
          <input
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="description"
            required
          />

          <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjects;
