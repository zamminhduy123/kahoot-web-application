import { IGameKahoot } from "../types";

interface ILiveGameKahoot extends IGameKahoot {
  gameId: string; //_id in database
  question: number;
  playersAnswered: number;
  rankingBoard?: {
    first: {
      name: string;
      score: number;
    };
    second: {
      name: string;
      score: number;
    };
    third: {
      name: string;
      score: number;
    };
    fourth: {
      name: string;
      score: number;
    };
    fifth: {
      name: string;
      score: number;
    };
  };
}

export default class Kahoot {
  games: {
    pin: string;
    hostId: string;
    isLive: boolean;
    gameData: ILiveGameKahoot;
  }[];

  players: {
    hostId: string;
    playerId: string; //socketId
    name: string;
    gameData: {
      gameId: string;
      score: number;
      answer: number;
    };
  }[];

  constructor() {
    this.games = [];
    this.players = [];
  }

  addGame(
    pin: string,
    hostId: string,
    isLive: boolean,
    gameId: string,
    gameKahoot: IGameKahoot
  ) {
    const gameData: ILiveGameKahoot = {
      ...gameKahoot,
      gameId,
      question: 0,
      playersAnswered: 0,
    };
    const game = { pin, hostId, isLive, gameData };
    this.games.push(game);
    return game;
  }

  getGame(hostId: string) {
    return this.games.filter((game) => game.hostId === hostId)[0];
  }
  removeGame(hostId: string) {
    const game = this.getGame(hostId);
    if (game) {
      this.games = this.games.filter((game) => game.hostId !== hostId);
    }
    return game;
  }

  addPlayer(hostId: string, playerId: string, name: string, gameId: string) {
    const player = {
      hostId,
      playerId,
      name,
      gameData: {
        gameId,
        score: 0,
        answer: 0,
      },
    };
    this.players.push(player);
    return player;
  }

  getPlayer(playerId: string) {
    return this.players.filter((player) => player.playerId === playerId)[0];
  }

  removePlayer(playerId: string) {
    const player = this.getPlayer(playerId);
    if (player) {
      this.players = this.players.filter(
        (player) => player.playerId !== playerId
      );
    }
    return player;
  }

  getPlayersInRoom(hostId: string) {
    return this.players.filter((player) => player.hostId === hostId);
  }

  updateRankingBoard(hostId: string) {
    const game = this.getGame(hostId);

    if (!game.gameData.rankingBoard) {
      game.gameData.rankingBoard = {
        first: { name: "", score: 0 },
        second: { name: "", score: 0 },
        third: { name: "", score: 0 },
        fourth: { name: "", score: 0 },
        fifth: { name: "", score: 0 },
      };
    }
    const rankingBoard = game.gameData.rankingBoard;

    const playersInGame = this.getPlayersInRoom(hostId);

    for (let i = 0; i < playersInGame.length; i++) {
      if (playersInGame[i].gameData.score > rankingBoard.fifth.score) {
        if (playersInGame[i].gameData.score > rankingBoard.fourth.score) {
          if (playersInGame[i].gameData.score > rankingBoard.third.score) {
            if (playersInGame[i].gameData.score > rankingBoard.second.score) {
              if (playersInGame[i].gameData.score > rankingBoard.first.score) {
                //First Place
                rankingBoard.fifth.name = rankingBoard.fourth.name;
                rankingBoard.fifth.score = rankingBoard.fourth.score;

                rankingBoard.fourth.name = rankingBoard.third.name;
                rankingBoard.fourth.score = rankingBoard.third.score;

                rankingBoard.third.name = rankingBoard.second.name;
                rankingBoard.third.score = rankingBoard.second.score;

                rankingBoard.second.name = rankingBoard.first.name;
                rankingBoard.second.score = rankingBoard.first.score;

                rankingBoard.first.name = playersInGame[i].name;
                rankingBoard.first.score = playersInGame[i].gameData.score;
              } else {
                //Second Place
                rankingBoard.fifth.name = rankingBoard.fourth.name;
                rankingBoard.fifth.score = rankingBoard.fourth.score;

                rankingBoard.fourth.name = rankingBoard.third.name;
                rankingBoard.fourth.score = rankingBoard.third.score;

                rankingBoard.third.name = rankingBoard.second.name;
                rankingBoard.third.score = rankingBoard.second.score;

                rankingBoard.second.name = playersInGame[i].name;
                rankingBoard.second.score = playersInGame[i].gameData.score;
              }
            } else {
              //Third Place
              rankingBoard.fifth.name = rankingBoard.fourth.name;
              rankingBoard.fifth.score = rankingBoard.fourth.score;

              rankingBoard.fourth.name = rankingBoard.third.name;
              rankingBoard.fourth.score = rankingBoard.third.score;

              rankingBoard.third.name = playersInGame[i].name;
              rankingBoard.third.score = playersInGame[i].gameData.score;
            }
          } else {
            //Fourth Place
            rankingBoard.fifth.name = rankingBoard.fourth.name;
            rankingBoard.fifth.score = rankingBoard.fourth.score;

            rankingBoard.fourth.name = playersInGame[i].name;
            rankingBoard.fourth.score = playersInGame[i].gameData.score;
          }
        } else {
          //Fifth Place
          rankingBoard.fifth.name = playersInGame[i].name;
          rankingBoard.fifth.score = playersInGame[i].gameData.score;
        }
      }
    }
  }
}
