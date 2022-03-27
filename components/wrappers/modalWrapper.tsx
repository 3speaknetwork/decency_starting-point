import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface IProps {
  onClose: () => void;
}

export const ModalWrapper: React.FC<IProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      position="absolute"
      zIndex={999}
      display="flex"
      justifyContent="center"
      alignItems="center"
      top={0}
      left={0}
      minWidth="100%"
      minHeight="100vh"
      backgroundColor="blackAlpha.600"
    >
      <Box
        position="relative"
        borderRadius="lg"
        backgroundColor="white"
        p={5}
        minW="25%"
      >
        <Box
          cursor="pointer"
          onClick={onClose}
          position="absolute"
          right={1}
          top={1}
        >
          <MdClose size="1.5rem" />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
