import { Box, Center, Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import { RiCheckFill, RiCloseFill } from 'react-icons/ri';

interface AnswerResult {
  points : number;
  right : boolean;
  rank: number;
  behindName : number;
  behindPoint : number;
}

const AnswerResult = ({points, right, rank,behindName,behindPoint} : AnswerResult) => {
  return (
    <Center w="100%" flexGrow={1} bgColor={right ? 'green' : 'red.700'} color='white'>
      <Flex direction={'column'} justify='center' align='center' fontSize={'3xl'}>
        <Icon boxSize={'40'} as={right ? RiCheckFill : RiCloseFill}></Icon>
        <Box>Current Point : {points.toFixed(0)} points</Box>
        <Box>You are in {rank} place</Box>
        {rank > 1 && <Box>Only {Math.abs(behindPoint-points).toFixed(0)} behind {behindName}</Box>}
      </Flex>
    </Center>
  )
}

export default AnswerResult