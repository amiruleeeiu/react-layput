import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { BiMessage } from "react-icons/bi";
import { CgProductHunt } from "react-icons/cg";
import { GrOrderedList } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const NAVLINK = [
    { path: "/", text: "Dashboard", icon: MdDashboard },
    { path: "/routing", text: "Routing", icon: CgProductHunt },
    { path: "/form", text: "Form", icon: CgProductHunt },
    { path: "/table", text: "Table", icon: BiMessage },
    { path: "/input", text: "Input", icon: CalendarIcon },
    { path: "/tinymce", text: "Tinymce", icon: GrOrderedList },
  ];
  return (
    <Box
      as="nav"
      bg="white"
      width={{ base: "full", md: "40", lg: "60" }}
      p="4"
      display={{ base: "none", md: "block" }}
      boxShadow="md"
    >
      <Box as="ul" listStyleType="none">
        {NAVLINK.map(({ path, text, icon: Icon }, index) => (
          <Box as="li" key={index} py={1}>
            <Box as={NavLink} to={path}>
              {({ isActive }: { isActive: boolean }) => (
                <Box
                  display="flex"
                  fontSize={18}
                  fontWeight={400}
                  _hover={{ bg: "blue.50" }}
                  bg={isActive ? "blue.50" : ""}
                  color={isActive ? "blue.600" : ""}
                  alignItems="center"
                  gap={2}
                  px={3}
                >
                  <Icon />
                  <Text py={3}> {text}</Text>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
