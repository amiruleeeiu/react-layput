import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { FC } from "react";

interface MobileSidebarInterfcae {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: FC<MobileSidebarInterfcae> = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            h={16}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>Basic Drawer</Box>
            <IconButton
              borderRadius="full"
              aria-label="close"
              boxSize={9}
              icon={<CloseIcon boxSize={4} />}
              onClick={onClose}
            />
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default MobileSidebar;
