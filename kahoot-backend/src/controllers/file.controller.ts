import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import * as ErrorMessage from "../error-messsage";
import { generateUploadURL } from "../utils/s3";

interface IQuery {
  folder?: string;
  isPrivate?: string;
  fileName?: string;
}

//FE Solution
export const uploadURL = async (req: Request, res: Response) => {
  const query = req.query as IQuery;
  const folder = query.folder;
  const isPrivate = false;

  const url = await generateUploadURL("uimpictures", isPrivate).catch((err) => {
    console.log(url);
  });

  if (url) {
    res.status(StatusCodes.OK).send({ url });
  }
};
