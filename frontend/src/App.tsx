import "./App.css";
import FormLogin from "./components/formLogin";
import ListUsers from "./components/listUsers";
import HomePage from "./pages/Homepage";
import PageUserProfile from "./pages/UserProfile";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";
import { useAuth } from "./components/auth";
import TrainersPage from "./pages/Trainers";
function App() {
  const { token } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: token ? <Navigate to="/homepage" replace /> : <FormLogin />,
        },
        {
          path: "homepage",
          element: token ? <HomePage /> : <Navigate to="/" replace />,
        },
        {
          path: "users",
          element: token ? <ListUsers /> : <Navigate to="/" replace />,
        },
        {
          path: "profile",
          element: token ? <PageUserProfile /> : <Navigate to="/" replace />,
        },
        {
          path: "trainers",
          element: token ? <TrainersPage /> : <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
