import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideNav = () => {
  const nav = useNavigate();
  const location = useLocation();

  const navData = [
    { name: "View Project", path: "/", icon: "📁" },
    { name: "Add Projects", path: "/CreateProjects", icon: "📄" },
  ];

  return (
    <div className="w-1/5 shadow-[0px_0px_10px_0px] shadow-black/10 border-r border-gray-200 flex flex-col h-screen p-4 px-0
                    max-md:w-full max-md:flex-row max-md:overflow-x-auto">
      {navData.map((item, index) => (
        <button
          key={index}
          onClick={() => nav(item.path)}
          className={`border-b border-gray-200 text-start pl-4 py-3
            
            ${location.pathname === item.path ? "bg-indigo-500 text-white font-semibold" : ""}
          `}
        >
          {item.icon} {item.name}
        </button>
      ))}
    </div>
  );
};

export default SideNav;
