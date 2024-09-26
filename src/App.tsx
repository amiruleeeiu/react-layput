import { ChakraProvider } from "@chakra-ui/react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import { routesConfig } from "./routes/routesConfig";
import { transformRoutesWithRole } from "./routes/transformRoutesWithRole";

function App() {
  const transformedRoutes = transformRoutesWithRole(routesConfig);

  // Use the transformed routes with useRoutes
  const element = useRoutes(transformedRoutes);
  return (
    <ChakraProvider>
      <Layout>{element}</Layout>
    </ChakraProvider>
  );
}

export default App;
