import {Request} from "express";
import IPayload from "./payload-jwt";

interface IPayloadUser extends IPayload {
    accessToken?: string;
}

interface IUserRequest extends Request {
    user?: IPayloadUser;
}

export default IUserRequest;