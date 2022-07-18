import { IGameKahoot } from "../types";

interface ILiveGameKahoot extends IGameKahoot {
  /**_id in database */
  gameId: string;
  question: number;
  playersAnswered: number;
  rankingBoard?: PlayerClass[];
}

class PlayerClass {
  hostId: string;
  playerId: string; //socketId
  name: string;
  gameData: {
    gameId: string;
    score: number;
    answer: number;
  };

  constructor() {
    this.hostId = "";
    this.playerId = "";
    this.name = "";
    this.gameData = {
      gameId: "",
      score: 0,
      answer: 0,
    };
  }
}
class GameClass {
  pin: string;
  hostId: string;
  isLive: boolean;
  gameData: ILiveGameKahoot;
  timer: number;

  constructor(pin?: string, hostId?: string, gameData?: ILiveGameKahoot) {
    this.pin = pin? pin: "";
    this.hostId = hostId? hostId : "";
    this.isLive = false;
    this.timer = 0;
    this.gameData = {
      gameId: "",
      question: 0,
      playersAnswered: 0,
      title: "",
      game: [],
    }
    if (gameData) {
      this.gameData = gameData;
    }
  }

  startTimer(totalTime: number) {
    const intervalNum = 10;
    const intervalObj = setInterval(() => {
      this.timer += 0.01;
      if (this.timer > totalTime) {
        console.log(this.timer > totalTime);
        clearInterval(intervalObj);
      }
    }, 10);
  }
}

export default class Kahoot {
  games: GameClass[];

  players: PlayerClass[];

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
    const game = new GameClass(pin, hostId, gameData);
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
        answer: -1,
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

    game.gameData!.rankingBoard = this.getPlayersInRoom(hostId);
    
    const rankingBoard = game.gameData!.rankingBoard;

    rankingBoard.sort((a: PlayerClass, b: PlayerClass) => {
      return b.gameData.score - a.gameData.score
    })

    return rankingBoard;
  }
}
