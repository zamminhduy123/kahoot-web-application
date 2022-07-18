import { Box } from '@chakra-ui/react'
import React from 'react'
import AnswerList from './AnswerList'



const CurrentResult = ({correctAnswer} : any) => {
  return (
    <Box>
        <AnswerList answers={[]} correct={0} handleClick={undefined} isPlaying={undefined}/>
    </Box>
  )
}

export default CurrentResult