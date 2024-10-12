import DataTable from "../pages/DataTable";
import DynamicForm from "../pages/DynamixForm";
import InputPage from "../pages/InputPage";
import MyForm from "../pages/MyForm";
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
    element: <MyForm />,
    roles: ["user", "admin"],
  },
  {
    path: "/dynamic-form",
    element: <DynamicForm />,
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
