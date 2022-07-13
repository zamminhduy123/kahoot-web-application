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

  const onHostJoinGame = async function (payload: { id: string }) {
    const oldHostId = payload.id;
    //Get game with old host id
    const game = kahoot.getGame(oldHostId);

    if (game) {
      //Changes the game host id to new host id
      game.hostId = socket.id;

      socket.join(game.pin);

      //Gets players in game
      const playerData = kahoot.getPlayersInRoom(oldHostId);
      for (let i = 0; i < kahoot.players.length; i++) {
        if (kahoot.players[i].hostId == oldHostId) {
          kahoot.players[i].hostId = socket.id;
        }
      }

      const gameId = game.gameData.gameId;
      const _gameDoc = await GameModel.findById(gameId).lean();

      //Get data of first question
      const question = _gameDoc?.game[0].question;
      const answers = _gameDoc?.game[0].solution;
      const correctAnswer = _gameDoc?.game[0].answer;

      socket.emit("gameQuestions", {
        question,
        answers,
        correct: correctAnswer,
        playersInGame: playerData.length,
      });

      io.to(game.pin).emit("gameStartedPlayer");
      game.isLive = true;
    } else {
      socket.emit("noGameFound");
    }
  };

  const onPlayerJoin = function (payload: { pin: string; name: string }) {
    const { pin, name } = payload;
    let gameFound = false;

    for (let i = 0; i < kahoot.games.length; i++) {
      const game = kahoot.games[i];
      if (pin == game.pin) {
        console.log("Player connected to game");
        const hostId = game.hostId;

        //Add player to the game
        kahoot.addPlayer(hostId, socket.id, name, game.gameData.gameId);

        //Player is joining room based on pin
        socket.join(pin);

        //Sending players data to display
        const playersInGame = kahoot.getPlayersInRoom(hostId);
        io.to(pin).emit("updatePlayerLobby", playersInGame);

        gameFound = true; //Game has been found
      }
    }

    if (!gameFound) {
      //Player is sent back to 'join' page because game was not found with pin
      socket.emit("noGameFound");
    }
  };

  const onPlayerJoinGame = function (payload: { id: string }) {
    const { id } = payload;
    const player = kahoot.getPlayer(id);

    if(player) {
      const game = kahoot.getGame(player.hostId);
      socket.join(game.pin);

      // update player id with socket id
      player.playerId = socket.id; 

      const playerData = kahoot.getPlayersInRoom(game.hostId);
      socket.emit('playerGameData', playerData);
    } else {
      //No player found
      socket.emit('noGameFound');
    }
  };

  const onGameStart = function () {
    const game = kahoot.getGame(socket.id);
    game.isLive = true;
    //Tell player and host that game has started
    socket.emit('gameStarted', game.hostId);
  };

  const onPlayerAnswer = function (payload: {
    num: number,
  }) {
    const {num} = payload;
    const player = kahoot.getPlayer(socket.id);
    const hostId = player.hostId;
    const playerNum = kahoot.getPlayersInRoom(hostId);
    const game = kahoot.getGame(hostId);

    if(game.isLive) {
      player.gameData.answer = num;
      game.gameData.playersAnswered += 1;
      
      const gameQuestion = game.gameData.question;
      const correctAnswer = game.gameData.game[gameQuestion].answer;
      
      //Check player answer with correct answer
      if(num == correctAnswer) {
        player.gameData.score += 100;
        io.to(game.pin).emit('getTime', socket.id);
        socket.emit('answerResult', true);
      }

      //Check if all players answered
      if(game.gameData.playersAnswered == playerNum.length) {
        //Question has been ended since players all answered
        game.isLive = false;
        const playerData = kahoot.getPlayersInRoom(game.hostId);
        io.to(game.pin).emit('questionOver', playerData, correctAnswer);
      } else {
        //update host screen of num players answered
        io.to(game.pin).emit('updatePlayersAnswered', {
          playersInGame: playerNum.length,
          playersAnswerd: game.gameData.playersAnswered,
        })
      }
    }
  };

  const onNextQuestion = function () {
    const playerData = kahoot.getPlayersInRoom(socket.id);

    //Reset players current answer to 0
    for(let i = 0; i < kahoot.players.length; i++) {
      if(kahoot.players[i].hostId == socket.id) {
        kahoot.players[i].gameData.answer = 0;
      }
    }

    const game = kahoot.getGame(socket.id);
    game.gameData.playersAnswered = 0;
    game.isLive = true;
    game.gameData.question += 1;
    
    if(game.gameData.game.length >= game.gameData.question) {
      let questionNum = game.gameData.question;
      const question = game.gameData.game[questionNum].question;
      const answers = game.gameData.game[questionNum].solution;
      const correctAnswer = game.gameData.game[questionNum].answer;
      
      socket.emit('gameQuestions', {
        question,
        answers,
        correct: correctAnswer,
        playersInGame: playerData.length,
      });
    }
    else {
      kahoot.updateRankingBoard(game.hostId);
      io.to(game.pin).emit('GameOver', game.gameData.rankingBoard);
    }

    io.to(game.pin).emit('nextQuestionPlayer');
  };

  const onTimeUp = function (payload: string) {
    const game = kahoot.getGame(socket.id);
    game.isLive = false;
    const playerData = kahoot.getPlayersInRoom(game.hostId);
    const gameQuestion = game.gameData.question;

    const correctAnswer = game.gameData.game[gameQuestion].answer;
    io.to(game.pin).emit('questionOver', playerData, correctAnswer);
  };

  const onDisconnect = function (payload: string) {};

  const onGetScore = function() {
    const player = kahoot.getPlayer(socket.id);
    socket.emit('newScore', player.gameData.score);
  };

  const onTime = function (payload: {
    time: number,
    player: string,
  }) {
    let time = payload.time / 20;
    time = time * 100;
    const playerId = payload.player;
    const player = kahoot.getPlayer(playerId);
    player.gameData.score += time;
  };

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
  socket.on("time-up", onTimeUp);

  socket.on('get-score', onGetScore);
  socket.on('time', onTime);

  //When one socket disconnected
  socket.on("disconnect", onDisconnect);
}
