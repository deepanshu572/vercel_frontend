import React, { useEffect } from "react";
import ProjectBox from "../components/ProjectBox";
import { serverUrl } from "../App";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const FetchProjects = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/project/all", {
        withCredentials: true,
      });
      console.log(result.data.projects);
      setProjects(result.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchProjects();
    console.log(projects);
  }, []);

  return (
    <div className="flex w-full  max-md:px-2 mt-[4.1rem]  justify-center ">
      {/* <SideNav /> */}

      <div className="p-8 flex flex-col w-full  min-h-screen items-center">
        <h2 className="text-2xl mb-8 font-bold">All Projects</h2>

        <div className="flex items-center  gap-2 ">
          {projects?.map((item, index) => {
            return (
              <ProjectBox
                key={index}
                title={item.title}
                id={item?._id}
                description={item.description}
              />
            );
          })}
        </div>
        <Link
          to="/CreateProjects"
          className="px-2 mt-8 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          + Create New Project
        </Link>
      </div>
    </div>
  );
};

export default AllProjects;
