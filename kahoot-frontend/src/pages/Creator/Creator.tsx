import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IQuestion } from "../../model/interface";
import Header from "./Header";
import MainDisplay from "./MainDisplay";
import NewQuestionList from "./NewQuestionList";
import QuestionInformation from "./QuestionInformation";

import { HiOutlineMail } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hook";
import { setTitle } from "../../model/reducers/newQuiz.reducer";

const Creator = () => {
  const { title, list, selected } = useAppSelector((state) => state.newQuiz);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const titleInputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (titleInputRef.current && titleInputRef.current.value != ""){
      dispatch(setTitle(titleInputRef.current.value));
    }
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginBottom={"16px"}>Kahoot Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="quiz-title">
              <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
                Quiz Title
              </FormLabel>
              <InputGroup size="lg">
                <Input
                  ref={titleInputRef}
                  type="text"
                  placeholder="Quiz Title..."
                  color={"black"}
                  _focus={{ boxShadow: "none", borderColor: "semiHeading" }}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme={"green"}
              onClick={() => {
                onSubmit();
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        w={"100%"}
        style={{ minHeight: "100vh", maxHeight: "100vh" }}
        direction={"column"}
      >
        <Header onSettingClick={onOpen} title={title}/>
        <Flex direction={"row"} width={"100%"} flex={1} minHeight="0px">
          <Flex
            direction={"column"}
            flex={"0 192px"}
            minH="0"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
            zIndex={10}
          >
            <NewQuestionList list={list} />
          </Flex>
          <Box flexGrow={"1"} h="100%" backgroundColor={"white"}>
            <MainDisplay question={undefined} />
          </Box>
          <Flex
            width={"fit-content"}
            padding="16px"
            direction={"column"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
          >
            <QuestionInformation />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Creator;
