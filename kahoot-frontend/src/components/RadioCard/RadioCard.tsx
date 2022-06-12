import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import React from "react";

interface RadioCardProps {
  radioProps: UseRadioProps;
  children?: React.ReactElement | React.ReactNode;
}

function RadioCard({ radioProps, children }: RadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" margin={"0"}>
      <input {...input} />
      <Box
        margin={"0"}
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "brand.600",
          color: "white",
          borderColor: "brand.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p={2}
      >
        {children}
      </Box>
    </Box>
  );
}
export default RadioCard;
