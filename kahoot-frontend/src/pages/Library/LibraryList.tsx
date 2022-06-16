import {
  border,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Spacer,
  Stack,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import RadioCard from "../../components/RadioCard";
import LibraryItem from "./LibraryItem";
import { RiSearchLine } from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";

interface LibraryListProps {
 
}

const LibraryList = ({} : LibraryListProps) => {
  //fetch data here
  const fakeData = [
    {
      name: "Kahoot_1",
      totalQuestion: 5,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_2",
      totalQuestion: 2,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_23",
      totalQuestion: 3,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
    {
      name: "Kahoot_5",
      totalQuestion: 4,
      last_modified: new Date(),
    },
  ];

  const options = ["Recents", "Favorite"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Filter",
    defaultValue: "Recents",
    onChange: console.log,
  });
  const group = getRootProps();

  return (
    <Stack w="100%" maxW={"1280px"} justifyContent='center'>
      <Flex direction={"row"} margin="10px 0px">
        <HStack {...group} p="0">
          {options.map((value, index) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={index} radioProps={radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
        <Spacer />
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input   focusBorderColor='brand.500' variant="outline" placeholder={`Search`} />
          </InputGroup>
        </Box>
      </Flex>
      {fakeData.map((data, index) => {
        return (
          <LibraryItem
            id={index}
            key={`${data.name}-${index}`}
            name={data.name}
            totalQuestion={data.totalQuestion}
            last_modified={data.last_modified}
          />
        );
      })}
    </Stack>
  );
};

export default LibraryList;
