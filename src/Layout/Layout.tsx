import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const footerBg = useColorModeValue("blue.200", "gray.800");

  return (
    <Flex height="100vh" flexDirection="column">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <Flex flex="1" overflow="hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Flex
          as="main"
          flex="1"
          flexDirection="column"
          maxWidth="7xl"
          margin="0 auto"
          overflow="auto"
          bg="gray.100"
        >
          <Box flex="1" p={4} m={2} bg="white">
            {children}
          </Box>
          <Box
            as="footer"
            bg={footerBg}
            width="100%"
            padding="4"
            textAlign="center"
            boxShadow="md"
          >
            <Box margin="0 auto">Footer Content</Box>
          </Box>
        </Flex>
      </Flex>

      {/* Footer */}
    </Flex>
  );
};

export default Layout;
