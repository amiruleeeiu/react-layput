import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import MobileSidebar from "./MobileSidebar";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      as="header"
      bg="white"
      width="100%"
      h="16"
      padding="3"
      boxShadow="md"
      zIndex="1"
    >
      <Box margin="0 auto" maxWidth="1200px">
        {" "}
        {/* Set maxWidth */}
        <Flex justifyContent="space-between" alignItems="center">
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            aria-label="Search database"
            boxSize={9}
            icon={<HamburgerIcon boxSize="5" />}
            onClick={onOpen}
          />
          <Box>Header Content</Box>
          <Box>Header Content</Box>
        </Flex>
      </Box>
      <MobileSidebar onClose={onClose} isOpen={isOpen} />
    </Box>
  );
}

export default Header;
