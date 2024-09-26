import DataTable from "../pages/DataTable";
import FormBuilder from "../pages/FormBuilder";
import InputPage from "../pages/InputPage";
import TinymceEditor from "../pages/TinymceEditor";
import Unauthorized from "../pages/Unauthorized";
import { RouteWithRole } from "./transformRoutesWithRole";

export const routesConfig: RouteWithRole[] = [
  {
    path: "/table",
    element: <DataTable />,
    roles: ["admin"],
  },
  {
    path: "/form",
    element: <FormBuilder />,
    roles: ["user", "admin"],
  },
  {
    path: "/tinymce",
    element: <TinymceEditor />,
    roles: ["user"],
  },
  {
    path: "/input",
    element: <InputPage />,
  },
  {
    path: "/not-authorized",
    element: <Unauthorized />,
  },
];
