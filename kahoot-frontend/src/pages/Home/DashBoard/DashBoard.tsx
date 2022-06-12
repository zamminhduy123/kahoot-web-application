import { Stack } from '@chakra-ui/react'
import React from 'react'

const DashBoard = () => {
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
  ];

  return (
    <div>DashBoard</div>
  )
}

export default DashBoard