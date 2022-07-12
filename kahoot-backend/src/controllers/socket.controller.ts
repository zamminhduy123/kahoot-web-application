import { Server, Socket } from "socket.io";
import Kahoot from "../classes/Kahoot.class";
import GameModel from "../models/Game.model";
import { gameSchema } from "../schemas";

export default function (io: Server, socket: Socket, kahoot: Kahoot) {
  const onHostJoin = async function (payload: { id: string }) {
    const { id } = payload;
    const _gameDoc = await GameModel.findById(id);

    //If game was found with id
    if (_gameDoc) {
      //new pin for game
      const gamePin = Math.floor(Math.random() * 90000) + 10000;

      //Creates a game with pin and host id
      kahoot.addGame(gamePin.toString(), socket.id, false, id, _gameDoc);

      //Gets the game data
      const game = kahoot.getGame(socket.id);

      //The host is joining a room base on the pin
      socket.join(game.pin);

      console.log("Game Created with pin: ", game.pin);

      //Sending game pin to host so they can display it for players to join
      socket.emit("showGamePin", {
        pin: game.pin,
      });
    } else {
      socket.emit("noGameFound");
    }
  };

  const onHostJoinGame = function (payload: string) {};

  const onPlayerJoin = function (payload: string) {
    console.log(payload);
  };

  const onPlayerJoinGame = function (payload: string) {};

  const onGameStart = function (payload: string) {};

  const onPlayerAnswer = function (payload: string) {};

  const onNextQuestion = function (payload: string) {};

  const onTimeOut = function (payload: string) {};

  const onDisconnect = function (payload: string) {};

  //When host connects for the first time
  socket.on("host-join", onHostJoin);

  //When host connects from the game view
  socket.on("host-join-game", onHostJoinGame);

  //When player connects for the first time
  socket.on("player-join", onPlayerJoin);

  //When player connects from the game view
  socket.on("player-join-game", onPlayerJoinGame);

  //When host starts the game
  socket.on("game-start", onGameStart);

  //When player answers the question
  socket.on("player-answer", onPlayerAnswer);

  //When host takes to next question
  socket.on("next-question", onNextQuestion);

  //When time out for the question
  socket.on("time-out", onTimeOut);

  //When one socket disconnected
  socket.on("disconnect", onDisconnect);
}
