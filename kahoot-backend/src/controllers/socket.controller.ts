import { Server, Socket } from "socket.io";
import Kahoot from "../classes/Kahoot.class";
import GameModel from "../models/Game.model";
import { gameSchema } from "../schemas";

export default function (io: Server, socket: Socket, kahoot: Kahoot) {
  const onHostJoin = async function (
    payload: { id: string },
    onSuccess: Function
  ) {
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

      const title = game.gameData.title;
      const gameObj = (await GameModel.findById(game.gameData.gameId).populate(
        "owner",
        "name"
      )) as any;
      const ownerName = gameObj?.toJSON().owner.name;
      const totalQuestions = gameObj?.toJSON().game.length;
      const gameId = game.gameData.gameId;

      //Sending game pin to host so they can display it for players to join
      onSuccess({ pin: game.pin, ownerName, totalQuestions, title });
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

  const onPlayerJoin = async function (
    payload: { pincode: string; name: string },
    onSuccess: Function
  ) {
    const { pincode, name } = payload;
    let gameFound = false;
    for (let i = 0; i < kahoot.games.length; i++) {
      const game = kahoot.games[i];
      if (pincode == game.pin) {
        console.log("Player connected to game");

        const title = game.gameData.title;
        const hostId = game.hostId;

        //Add player to the game
        const newPlayer = kahoot.addPlayer(
          hostId,
          socket.id,
          name,
          game.gameData.gameId
        );

        //Player is joining room based on pin
        socket.join(game.hostId);
        onSuccess({ pin: pincode });
        //Sending players data to display
        io.to(game.hostId).emit("updatePlayerLobby", {
          name: newPlayer.name,
        });

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

    if (player) {
      const game = kahoot.getGame(player.hostId);
      socket.join(game.pin);

      // update player id with socket id
      player.playerId = socket.id;

      const playerData = kahoot.getPlayersInRoom(game.hostId);
      socket.emit("playerGameData", playerData);
    } else {
      //No player found
      socket.emit("noGameFound");
    }
  };

  const onGameStart = async function () {
    const game = kahoot.getGame(socket.id);
    game.isLive = true;

    const _gameDoc = await GameModel.findById(game.gameData.gameId).lean();
    game.gameData.game = _gameDoc!.game;
    game.EmitEventAfterGameOver = () => {
    }

    //Tell player and host that game has started
    io.to(socket.id).emit("gameStarted");

    setTimeout(() => {
      game.gameData.playersAnswered = 0;
      game.isLive = true;

      let questionNum = game.gameData.question;
      const question = game.gameData.game[questionNum].question;
      const answers = game.gameData.game[questionNum].solution;
      const timeUp = game.gameData.game[questionNum].timeUp || 10;
      const image = game.gameData.game[questionNum].image;
      game.gameData.game[questionNum].timeUp = timeUp;

      io.to(socket.id).emit("question", {
        question,
        answers,
        timeUp,
        image,
      });
      
      game.startTimer(timeUp);
    }, 5000);

  };

  const onPlayerAnswer = function (payload: { num: number }) {
    const { num } = payload;
    const player = kahoot.getPlayer(socket.id);
    const hostId = player.hostId;
    const playerNum = kahoot.getPlayersInRoom(hostId);
    const game = kahoot.getGame(hostId);

    if (game.isLive) {
      player.gameData.answer = num;
      game.gameData.playersAnswered += 1;

      const gameQuestion = game.gameData.question;
      const correctAnswer = game.gameData.game[gameQuestion].answer;

      //Check player answer with correct answer
      if (num == correctAnswer) {
        player.gameData.score += Math.round((100 + (game.gameData.game[gameQuestion].timeUp - game.timer)) * 100)/ 100;
        console.log(game.gameData.game[gameQuestion].timeUp);
        console.log(game.timer);
        // io.to(game.pin).emit("getTime", socket.id);
        // socket.emit("answerResult", true);
      }

      //Check if all players answered
      if (game.gameData.playersAnswered == playerNum.length) {
        //Question has been ended since players all answered
        game.isLive = false;
        const playerData = kahoot.updateRankingBoard(game.hostId);
        io.to(game.hostId).emit("questionOver", {playerData, correctAnswer});
        clearInterval(game.intervalObj);

      } else {
        //update host screen of num players answered
        io.to(game.hostId).emit("updatePlayersAnswered", {
          playersInGame: playerNum.length,
          playersAnswered: game.gameData.playersAnswered,
        });
      }
    }
  };

  const onNextQuestion = function () {
    const playerData = kahoot.getPlayersInRoom(socket.id);

    //Reset players current answer to 0
    for (let i = 0; i < kahoot.players.length; i++) {
      if (kahoot.players[i].hostId == socket.id) {
        kahoot.players[i].gameData.answer = -1;
      }
    }

    const game = kahoot.getGame(socket.id);
    game.gameData.playersAnswered = 0;
    game.isLive = true;
    game.gameData.question += 1;

    if (game.gameData.game.length > game.gameData.question) {
      let questionNum = game.gameData.question;
      const question = game.gameData.game[questionNum].question;
      const answers = game.gameData.game[questionNum].solution;
      const timeUp = game.gameData.game[questionNum].timeUp || 10;
      const image = game.gameData.game[questionNum].image;
      game.gameData.game[questionNum].timeUp = timeUp;

      io.to(game.hostId).emit("question", {
        question,
        answers,
        timeUp,
        image
      });

      game.startTimer(timeUp);
    } else {
      const rankingBoard = kahoot.updateRankingBoard(game.hostId);
      io.to(game.hostId).emit("gameOver", {playerData: rankingBoard});
    }
  };

  const onTimeUp = function () {
    const game = kahoot.getGame(socket.id);
    if(game) {
      game.isLive = false;
      const playerData = kahoot.updateRankingBoard(game.hostId);
      const gameQuestion = game.gameData.question;
      
      if(gameQuestion >= game.gameData.game.length) {
        return;
      }
      const correctAnswer = game.gameData.game[gameQuestion].answer;
      io.to(game.hostId).emit("questionOver", {playerData, correctAnswer});
    }
  };

  const onDisconnect = function (payload: string) {
    const game = kahoot.getGame(socket.id); //Finding game with socket.id
    //If a game hosted by that id is found, the socket disconnected is a host
    if (game) {
      //Checking to see if host was disconnected or was sent to game view
      if (game.isLive == false) {
        kahoot.removeGame(socket.id); //Remove the game from games class
        console.log("Game ended with pin:", game.pin);

        const playersToRemove = kahoot.getPlayersInRoom(game.hostId); //Getting all players in the game

        //For each player in the game
        for (let i = 0; i < playersToRemove.length; i++) {
          kahoot.removePlayer(playersToRemove[i].playerId); //Removing each player from player class
        }

        io.to(game.hostId).emit("hostDisconnect"); //Send player back to 'join' screen
        socket.leave(game.hostId); //Socket is leaving room
      }
    } else {
      //No game has been found, so it is a player socket that has disconnected
      const player = kahoot.getPlayer(socket.id); //Getting player with socket.id
      //If a player has been found with that id
      if (player) {
        const hostId = player.hostId; //Gets id of host of the game
        const game = kahoot.getGame(hostId); //Gets game data with hostId
        const pin = game.pin; //Gets the pin of the game

        if (game.isLive == false) {
          kahoot.removePlayer(socket.id); //Removes player from players class
          const playersInGame = kahoot.getPlayersInRoom(hostId); //Gets remaining players in game

          io.to(hostId).emit("updatePlayerLobby", playersInGame); //Sends data to host to update screen
          socket.leave(hostId); //Player is leaving the room
        }
      }
    }
  };

  const onGetScore = function () {
    const player = kahoot.getPlayer(socket.id);
    socket.emit("newScore", player.gameData.score);
  };

  const onTime = function (payload: { time: number; player: string }) {
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

  socket.on("get-score", onGetScore);
  socket.on("time", onTime);

  //When one socket disconnected
  socket.on("disconnect", onDisconnect);
}
