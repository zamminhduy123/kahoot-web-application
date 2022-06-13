import UserModel from "../models/User.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors";
import * as ErrorMessage from "../error-messsage";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  
  const user = await UserModel.findOne({ email });

  if(!user) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
  }

  const isTruePassword = await user.comparePassword(password);
  if(!isTruePassword) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
  }
  
  return res.status(StatusCodes.OK).json(user?.toJSON());
};

export const register = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  await user.hashPassword();
  await user.save();
  
  return res.json(user.toJSON());
};
