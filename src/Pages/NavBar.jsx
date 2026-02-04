import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import axios from "axios";
import ProjectBox from "../components/ProjectBox.jsx";
import { useAuth } from "../authContext.jsx";


const NavBar = () => {
  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);      
      setToggle(false);
      navigate("/login"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col w-full items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
      <nav className="z-50 fixed top-0 border-b border-gray-200 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
        
        {/* Logo */}
        <Link to="/">
          <img
            src="https://brihatinfotech.com/_next/image?url=%2Fbrihat.png&w=1920&q=75"
            alt="logo"
            className="h-8"
          />
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:block space-x-3">
          {!user ? (
            <Link to="/login">
              <button className="px-6 py-2 border cursor-pointer border-indigo-600 rounded-md hover:bg-slate-100">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={logoutHandler}
              className="px-6 py-2 cursor-pointer border border-red-600 text-red-600 rounded-md hover:bg-red-100"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </section>
  );
};



export default NavBar;
