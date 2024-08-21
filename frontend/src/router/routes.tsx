import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute isAuthRoute={true}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRoute isAuthRoute={true}>
        <SignUp />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Navigate to="/login" /> },
]);
export default router;
