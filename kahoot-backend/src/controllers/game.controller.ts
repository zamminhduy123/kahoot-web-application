import GameModel from "../models/Game.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserRequest } from "../types";

interface IGame {
  owner: string;
  game: {
    question: string;
    solution: string[];
    answer: number;
  }[];
}

export const createGame = async (req: IUserRequest, res: Response) => {
  const owner = req.user?.userId;
  const game = req.body.game as IGame;

  await GameModel.create({
    owner,
    game,
  });

  res.json({
    game,
    owner,
    accessToken: req.user?.accessToken,
  });
};

export const getYourGames = async (req: IUserRequest, res: Response) => {
  const owner = req.user?.userId;

  const games = await GameModel.find({
    owner,
  });

  res.json({
    games: games, 
    accessToken: req.user?.accessToken,
  })
}