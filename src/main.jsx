import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Content/Users/Home/Home";
import Deteksi from "./Content/Users/Deteksi/Deteksi";
import Informasi from "./Content/Users/Informasi/Informasi";
import About from "./Content/Users/About/About";
import Login from "./Content/Auth/Login/Login";
import Register from "./Content/Auth/Register/Register";
import Gejala from "./Content/Admin/Gejala/Gejala";
import Dashboard from "./Content/Admin/DashBoard/Dashboard";
import HamaPenyakit from "./Content/Admin/HamaPenyakit/HamaPenyakit";
import BasisKasus from "./Content/Admin/BasisKasus/BasisKasus";
import Report from "./Content/Admin/Report/Report";
import HasilDeteksi from "./content/Users/HasilDeteksi/HasilDeteksi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/deteksi",
    element: <Deteksi />,
  },
  {
    path: "/informasi",
    element: <Informasi />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/gejala",
    element: <Gejala />,
  },
  {
    path: "/admin/hamapenyakit",
    element: <HamaPenyakit />,
  },
  {
    path: "/admin/basiskasus",
    element: <BasisKasus />,
  },
  {
    path: "/admin/report",
    element: <Report />,
  },
  {
    path: `/hasil-deteksi/:idDeteksi`,
    element: <HasilDeteksi />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
