import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { IPlayer } from "../../../model/interface/player.model";

const PlayerListItem = ({ player }: { player: IPlayer }) => {
  return (
    <Tr>
      <Td fontWeight={600} fontSize='2xl'>{player.name}</Td>
      <Td fontWeight={600} fontSize='2xl' isNumeric textAlign={'right'}>{Number(player.score).toFixed(0)}</Td>
    </Tr>
  );
};

interface PlayerListProps {
  list: IPlayer[];
}

const PlayerList = ({ list }: PlayerListProps) => {
  return (
    <TableContainer width={"100%"} color="white" overflowY={"hidden"}>
      <Table variant="stripe" colorScheme="brand">
        <Thead color={"white"}>
          <Tr>
            <Th  color='white' fontSize='sm'>Name</Th>
            <Th textAlign={'right'} color='white' fontSize='sm' isNumeric>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.slice(0, Math.min(list.length, 10)).map((player: IPlayer) => {
            return <PlayerListItem player={player} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
