import Login from "../views/Login";
import UploadForm from "../views/UploadForm";

export const routesView = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/project:idProjectVideo",
    element: <UploadForm />,
  },
];
