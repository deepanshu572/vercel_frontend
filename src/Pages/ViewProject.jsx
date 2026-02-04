import React, { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [itemId, setItemId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);
  const { id } = useParams();

  const FetchTasks = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/task/projects/" + id + "/allTask",
        {
          withCredentials: true,
        },
      );
      console.log(result.data.tasks);
      setTasks(result.data.tasks);
      setProjects(result.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTasks = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        serverUrl + "/api/task/create",
        {
          title,
          projectId: id,
        },
        {
          withCredentials: true,
        },
      );
      FetchTasks();
      setTitle("");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskToggle = async (taskId) => {
    try {
      const result = await axios.put(
        serverUrl + "/api/task/togle/" + taskId,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(result);
      FetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      const result = await axios.delete(
        serverUrl + "/api/task/delete/" + taskId,
        {
          withCredentials: true,
        },
      );
      console.log(result);
      FetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (taskId, newTitle) => {
    try {
      const result = await axios.put(
        serverUrl + "/api/task/update/" + taskId,
        { title: newTitle  },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setModalToggle(false);
      FetchTasks();
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    FetchTasks();
    console.log(tasks);
  }, [id]);

  return (
    <div className="flex flex-col p-8 px-20 w-full  max-md:px-2 mt-[4.1rem]  justify-center ">
      <h3 className="text-2xl font-bold uppercase">{projects?.title}</h3>
      <p className="text-gray-700 w-1/2 mt-2 capitalize">
        {projects?.description}
      </p>

      <h4 className="text-3xl font-semibold pb-6 text-center mt-8 border-t border-gray-200 pt-4">
        Add Tasks{" "}
      </h4>
      <form
        onSubmit={handleTasks}
        className="inputs flex items-center gap-3 justify-center "
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Tasks"
          className=" border bg-indigo-500/5 border-gray-500/10 outline-none rounded py-2.5 px-3"
        />
        <button className="px-2 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          Add Tasks
        </button>
      </form>
      <div className="tasks w-1/2 mx-auto">
        <h4 className="text-2xl font-semibold mt-8 mb-4">Tasks List</h4>
        <div className="tasks_box">
          {tasks?.map((item, index) => {
            return (
              <div className="flex flex-col ">
                <div
                  key={index}
                  className="task_item text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 px-4 flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <p className="uppercase">{item.title}</p>
                  <div className="edit flex gap-2">
                    {item.completed ? (
                      <button
                        onClick={() => handleTaskToggle(item._id)}
                        className="px-2 bg-green-500 hover:bg-green-600 transition-all active:scale-95 py-1.5 rounded text-white font-medium"
                      >
                        Mark as Incomplete
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTaskToggle(item._id)}
                        className="px-2 bg-red-500 hover:bg-red-600 transition-all active:scale-95 py-1.5 rounded text-white font-medium"
                      >
                        Mark as Complete
                      </button>
                    )}

                    {!item.completed && (
                      <button
                        onClick={() => {
                          setNewTitle(item.title);
                          setModalToggle(true);
                          setItemId(item._id);
                        }}
                        className="px-2 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-1.5 rounded text-white font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {item.completed && (
                      <button
                        onClick={() => handleDeleteTask(item._id)}
                        className="px-2 bg-red-500 hover:bg-red-600 transition-all active:scale-95 py-1.5 rounded text-white font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalToggle && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#d0d0d07a] bg-opacity-30 flex items-center justify-center">
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
           <h3 className="text-xl font-semibold mb-4">Update Tasks</h3>
            <input
              type="text"
              value={newTitle}
              placeholder="update task"
              onChange={(e) => setNewTitle(e.target.value)}
              className="border bg-indigo-500/5 w-full border-gray-500/10 outline-none rounded py-2.5 px-3"
            />
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
              <button
                onClick={() => setModalToggle(false)}
                type="button"
                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(itemId, newTitle)}
                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {
  modalToggle && (
<div className="absolute top-0 left-0 w-full h-full bg-[#d0d0d07a] bg-opacity-30 flex items-center justify-center">
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
                Do you really want to continue? This action<br />cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button onClick={()=>setModalToggle(false)} type="button" className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
                    Cancel
                </button>
                <button type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition">
                    Confirm
                </button>
            </div>
        </div>
        </div>
  )
} */}
    </div>
  );
};

export default ViewProject;
