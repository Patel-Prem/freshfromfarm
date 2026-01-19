import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsLightTheme } from "./features/theme/themeSlice";
import { selectIsLoggedIn } from "./features/auth/authSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

function Layout() {
  const isLightTheme = useSelector(selectIsLightTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    const html = document.documentElement.classList;
     if (!isLightTheme) {
       document.documentElement.classList.add("dark");
     } else {
       document.documentElement.classList.remove("dark");
     }
    // console.log("isLightTheme :", isLightTheme);
    // html.toggle("light", isLightTheme);
    // html.toggle("dark", !isLightTheme);
  }, [isLightTheme]);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {
        isLoggedIn
          ?
          <div className="flex flex-1 bg-gray-100 dark:bg-gray-900">
            {/* overflow - hidden */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
          :
          <Outlet />
      }
      <Footer />
    </div>
  );
}

export default Layout;