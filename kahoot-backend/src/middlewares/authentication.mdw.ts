import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors";
import * as ErrorMessage from "../error-messsage";
import { IUserRequest, IPayload } from "../types";
import UserModel from "../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET!;

export const compulsoryAuth = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    req.user = {
      ...payload,
    };
    next();
  } catch (error) {
    await refreshAccessToken(req, token);
    next();
  }
};

const refreshAccessToken = async (req: IUserRequest, token: string) => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET, {
      ignoreExpiration: true,
    }) as IPayload;
  } catch (error) {
    throw new UnauthenticatedError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
  }

  req.user = {
    ...payload,
  };

  const user = await UserModel.findById(payload.userId);
  if (!user) {
    throw new BadRequestError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
  }

  const refreshToken = req.headers.refresh as string;
  if (!user.compareRefreshToken(refreshToken)) {
    throw new BadRequestError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
  }

  req.user!.accessToken = user.createJWT();
};
