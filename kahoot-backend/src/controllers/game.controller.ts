import GameModel from "../models/Game.model";
import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import { IUserRequest } from "../types";

interface IGame {
    owner: string;
    game: {
        question: string,
        solution: string[],
        answer: number,
    }[]
}

export const createGame = async (req: IUserRequest, res: Response) => {
    const owner = req.user?.userId;
    const game = req.body as IGame;
    res.json({
        game,
        owner,
        accessToken: req.user?.accessToken,
    });
}