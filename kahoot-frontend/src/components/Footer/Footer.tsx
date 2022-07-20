import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <Flex w="100%" h="100px" justify={"space-between"} align='center' padding='0px 20px' bottom='0'>
      <Box>Copyright © 2022, Kahoot! All Rights Reserved.</Box>
      <Box>
        <img height="100px" width={'80px'} src={logo} style={{objectFit: 'cover'}} />
      </Box>
    </Flex>
  );
};

export default Footer;
