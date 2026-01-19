import { Routes, Route } from "react-router-dom";

// Ref: https://fkhadra.github.io/react-toastify/introduction/
import { ToastContainer } from "react-toastify";

import Layout from "./Layout.jsx";
import EcommerceLayout from "./components/Ecommerce/EcommerceLayout.jsx";
import Home from "./components/Home/Home.jsx";
import Signup from "./components/LoginRegistration/SignUp.jsx";
import Signin from "./components/LoginRegistration/SignIn.jsx";
import AddProduce from "./components/Ecommerce/AddProduce.jsx";
import ProductPage from "./components/Ecommerce/ProductPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProduceList from "./components/Ecommerce/ProduceList.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import OrderBoard from "./components/Orders/OrderBoard.jsx";
import ResetPassword from "./components/LoginRegistration/ResetPassword.jsx";

function App() {
  return (
    <>
      <AppContent />
      <ToastContainer />
    </>
  );
}

function AppContent() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/e-commerce"
            element={
              <ProtectedRoute>
                <EcommerceLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProduceList />} />
            <Route path=":produceId" element={<ProductPage />} />
            <Route path="add" element={<AddProduce />} />
          </Route>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                {" "}
                <OrderBoard />{" "}
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </div>
  );
}


export default App;
