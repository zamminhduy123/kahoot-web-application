import UserModel from "models/User.model";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ name: "minhlamvo" });
  user?.hashPassword();
  user?.getTest();
};
