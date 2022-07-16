import { IGameKahoot } from "../types";
interface ILiveGameKahoot extends IGameKahoot {
    gameId: string;
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
        playerId: string;
        name: string;
        gameData: {
            gameId: string;
            score: number;
            answer: number;
        };
    }[];
    constructor();
    addGame(pin: string, hostId: string, isLive: boolean, gameId: string, gameKahoot: IGameKahoot): {
        pin: string;
        hostId: string;
        isLive: boolean;
        gameData: ILiveGameKahoot;
    };
    getGame(hostId: string): {
        pin: string;
        hostId: string;
        isLive: boolean;
        gameData: ILiveGameKahoot;
    };
    removeGame(hostId: string): {
        pin: string;
        hostId: string;
        isLive: boolean;
        gameData: ILiveGameKahoot;
    };
    addPlayer(hostId: string, playerId: string, name: string, gameId: string): {
        hostId: string;
        playerId: string;
        name: string;
        gameData: {
            gameId: string;
            score: number;
            answer: number;
        };
    };
    getPlayer(playerId: string): {
        hostId: string;
        playerId: string;
        name: string;
        gameData: {
            gameId: string;
            score: number;
            answer: number;
        };
    };
    removePlayer(playerId: string): {
        hostId: string;
        playerId: string;
        name: string;
        gameData: {
            gameId: string;
            score: number;
            answer: number;
        };
    };
    getPlayersInRoom(hostId: string): {
        hostId: string;
        playerId: string;
        name: string;
        gameData: {
            gameId: string;
            score: number;
            answer: number;
        };
    }[];
    updateRankingBoard(hostId: string): void;
}
export {};
//# sourceMappingURL=Kahoot.class.d.ts.map