import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import MainContent from "./Layout/MainContent";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Layout>
          <MainContent />
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
