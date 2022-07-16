import UserModel from "../models/User.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors";
import * as ErrorMessage from "../error-messsage";
import { IUserRequest } from "../types";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await UserModel.findOne({ email });
  

  if (!user) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
  }

  const isTruePassword = await user.comparePassword(password);
  if (!isTruePassword) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
  }

  const accessToken = user.createJWT();
  const userObjToSend = {
    ...user.toJSON(),
    __v: undefined,
    password: undefined,
  };
  return res.status(StatusCodes.OK).json({ ...userObjToSend, accessToken });
};

export const register = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);

  await user.hashPassword();
  await user.createRefreshToken();
  await user.save();

  const accessToken = user.createJWT();

  const userObjToSend = {
    ...user.toJSON(),
    __v: undefined,
    password: undefined,
  };
  return res
    .status(StatusCodes.CREATED)
    .json({ ...userObjToSend, accessToken });
};


export const autoLogin = async (req: IUserRequest, res: Response) => {
  const userId = req.user?.userId;

  const user = await UserModel.findById(userId);

  if(!user) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
  }

  await user.createRefreshToken();
  const accessToken = user.createJWT();

  const userObjToSend = {
    ...user.toJSON(),
    __v: undefined,
    password: undefined,
  };
  return res.status(StatusCodes.OK).json({ ...userObjToSend, accessToken });
}