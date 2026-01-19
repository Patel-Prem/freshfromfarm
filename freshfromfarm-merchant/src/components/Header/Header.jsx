import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn, logOut } from "../../features/auth/authSlice";
import { selectUserInitials } from "../../features/user/userSlice";
import {
  selectIsLightTheme,
  changeThemeMode,
} from "../../features/theme/themeSlice";

import { signOut } from "../../api/authAPI";
import Button from "../Common/Button";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInitials = useSelector(selectUserInitials);
  const isLightTheme = useSelector(selectIsLightTheme);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const DropdownItem = ({ label, action, path, color }) => {
    const handleClick = () => {
      setDropdownOpen(false);
      if (action) action();
      if (path) navigate(path);
    };

    const colorVariants = {
      blackWhite:
        "hover:!bg-gray-900 hover:!text-gray-300 dark:hover:!bg-white dark:hover:!text-black",
      red: "!text-rose-600 border-t hover:!bg-rose-200",
    };

    return (
      <li
        onClick={handleClick}
        className={`px-4 py-2 cursor-pointer hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-600 ${colorVariants[color]}`}
      >
        {label}
      </li>
    );
  };

  const handleLogOut = async () => {
    try {
      const res = await signOut();
      dispatch(logOut()); // Clear Redux state locally
      navigate(res.data.redirectTo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleThemeMode = () => {
    dispatch(changeThemeMode());
    // dispatch(changeThemeMode({ isLightTheme }))
    // localStorage.setItem("isLightTheme", !isLightTheme)
  };

  return (
    <header className="w-full py-2 px-4 bg-background border-b border-gray-200 dark:border-gray-700/60">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="hidden md:inline-block text-md md:text-3xl font-bold font-[cursive] text-primary">
          FreshFromFarm
        </div>

        <div className="md:hidden sm:inline-block text-md md:text-3xl font-bold font-[cursive] text-foreground">
          F3
        </div>

        {/* Search box */}
        {/* <Searchbox /> */}

        {/* Theme Mode, Signin, Singup and Profile Buttons*/}
        <div className="flex items-center space-x-3">
          {/* Theme Mode */}
          <button
            onClick={handleThemeMode}
            className="flex items-center justify-center w-7 h-7 rounded-full
          dark:bg-gray-700"
          >
            {isLightTheme ? (
              <svg
                viewBox="-7.5 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFF"
                width="150"
                height="150"
              >
                <rect
                  x="-7.5"
                  y="0"
                  width="32"
                  height="32"
                  rx="16"
                  ry="16"
                  fill="#000"
                />
                <g transform="translate(-3.75, 3.75)">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            ) : (
              <svg
                fill="#FFC000"
                viewBox="-7.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
              >
                <rect
                  x="-7.5"
                  y="0"
                  width="32"
                  height="32"
                  rx="16"
                  ry="16"
                  fill="#FFE5B4"
                />

                <path d="M9.75 8.25v0.219c0 0.844-0.375 1.25-1.156 1.25s-1.125-0.406-1.125-1.25v-0.219c0-0.813 0.344-1.219 1.125-1.219s1.156 0.406 1.156 1.219zM12.063 9.25l0.156-0.188c0.469-0.688 1.031-0.781 1.625-0.344 0.625 0.438 0.719 1.031 0.25 1.719l-0.188 0.156c-0.469 0.688-1.031 0.781-1.625 0.313-0.625-0.438-0.688-0.969-0.219-1.656zM5 9.063l0.125 0.188c0.469 0.688 0.406 1.219-0.188 1.656-0.625 0.469-1.219 0.375-1.688-0.313l-0.125-0.156c-0.469-0.688-0.406-1.281 0.188-1.719 0.625-0.438 1.219-0.281 1.688 0.344zM8.594 11.125c2.656 0 4.844 2.188 4.844 4.875 0 2.656-2.188 4.813-4.844 4.813-2.688 0-4.844-2.156-4.844-4.813 0-2.688 2.156-4.875 4.844-4.875zM1.594 12.5l0.219 0.063c0.813 0.25 1.063 0.719 0.844 1.469-0.25 0.75-0.75 0.969-1.531 0.719l-0.219-0.063c-0.781-0.25-1.063-0.719-0.844-1.469 0.25-0.75 0.75-0.969 1.531-0.719zM15.375 12.563l0.219-0.063c0.813-0.25 1.313-0.031 1.531 0.719s-0.031 1.219-0.844 1.469l-0.188 0.063c-0.813 0.25-1.313 0.031-1.531-0.719-0.25-0.75 0.031-1.219 0.813-1.469zM8.594 18.688c1.469 0 2.688-1.219 2.688-2.688 0-1.5-1.219-2.719-2.688-2.719-1.5 0-2.719 1.219-2.719 2.719 0 1.469 1.219 2.688 2.719 2.688zM0.906 17.281l0.219-0.063c0.781-0.25 1.281-0.063 1.531 0.688 0.219 0.75-0.031 1.219-0.844 1.469l-0.219 0.063c-0.781 0.25-1.281 0.063-1.531-0.688-0.219-0.75 0.063-1.219 0.844-1.469zM16.094 17.219l0.188 0.063c0.813 0.25 1.063 0.719 0.844 1.469s-0.719 0.938-1.531 0.688l-0.219-0.063c-0.781-0.25-1.063-0.719-0.813-1.469 0.219-0.75 0.719-0.938 1.531-0.688zM3.125 21.563l0.125-0.188c0.469-0.688 1.063-0.75 1.688-0.313 0.594 0.438 0.656 0.969 0.188 1.656l-0.125 0.188c-0.469 0.688-1.063 0.75-1.688 0.313-0.594-0.438-0.656-0.969-0.188-1.656zM13.906 21.375l0.188 0.188c0.469 0.688 0.375 1.219-0.25 1.656-0.594 0.438-1.156 0.375-1.625-0.313l-0.156-0.188c-0.469-0.688-0.406-1.219 0.219-1.656 0.594-0.438 1.156-0.375 1.625 0.313zM9.75 23.469v0.25c0 0.844-0.375 1.25-1.156 1.25s-1.125-0.406-1.125-1.25v-0.25c0-0.844 0.344-1.25 1.125-1.25s1.156 0.406 1.156 1.25z"></path>
              </svg>
            )}
          </button>

          {/* Sign Up, Log In, Account */}
          {!isLoggedIn ? (
            <div className="space-x-2">
              <Button
                onClick={() => navigate("/register")}
                variant="contrast"
                size="sm"
                className="min-h-10 px-8 rounded-2xl"
                hover
              >
                Sign Up
              </Button>
              {/* <button
                className="text-sm md:text-md border-none text-foreground font-bold hover:scale-110 hover:duration-300 hover:ease-in-out rounded-2xl "
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>

              <button
                className="text-sm md:text-md bg-gray-100 text-foreground font-bold border-[0] rounded-2xl p-2 hover:scale-110 hover:duration-300 ease-in-out"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button> */}

              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                size="sm"
                className="min-h-10 px-8 rounded-2xl"
                hover
              >
                Sign In
              </Button>
            </div>
          ) : (
            <>
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-[42px] aspect-square ring-4 dark:!ring-gray-300/50 rounded-full bg-green-700 dark:bg-gray-900"
                  style={{
                    transition: "transform 5s ease-in-out",
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transition =
                      "transform 2s ease-in-out";
                  }}
                >
                  <span className="text-white font-bold text-xl">
                    {userInitials || localStorage.getItem("userInitials")}
                  </span>
                </button>

                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 p-1 w-48 bg-gray-100 dark:bg-gray-800 border-none rounded shadow-md z-50">
                    <DropdownItem label="My Profile" />
                    <DropdownItem label="Settings" />
                    {/* <DropdownItem label="Change Theme" color="blackWhite" /> */}
                    <DropdownItem
                      label="Sign Out"
                      action={handleLogOut}
                      color="red"
                    />
                  </ul>
                )}
              </div>
              <button
                className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 md:hidden"
                aria-controls="sidebar"
                aria-expanded="false"
                onClick={onMenuClick}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="5" width="16" height="2"></rect>
                  <rect x="4" y="11" width="16" height="2"></rect>
                  <rect x="4" y="17" width="16" height="2"></rect>
                </svg>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
