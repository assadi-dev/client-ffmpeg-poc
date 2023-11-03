import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "../views/Login";
import UploadForm from "../views/UploadForm";
import UploadFlowJs from "../views/UploadFlowJs";

function App() {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/project/:room",
      element: <UploadForm />,
    },
    {
      path: "/uploads",
      element: <UploadFlowJs />,
    },
  ]);

  return <RouterProvider router={routerConfig} />;
}

export default App;
