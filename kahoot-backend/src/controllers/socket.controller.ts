import { Server, Socket } from "socket.io";

export default function(io: Server, socket: Socket) {
    const onHostJoin = function (payload: string) {
        
    }

    const onHostJoinGame = function(payload: string) {

    }

    const onPlayerJoin = function (payload: string) {

    }

    const onPlayerJoinGame = function(payload: string) {

    }

    const onGameStart = function(payload: string) {

    }

    const onPlayerAnswer = function(payload: string) {

    }

    const onNextQuestion = function(payload: string) {

    }

    const onTimeOut = function(payload: string) {

    }

    const onDisconnect = function(payload: string) {

    }
    
    
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
    socket.on("disconnect", onDisconnect)

}