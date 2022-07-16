import { Request, Response } from "express";
import { IUserRequest } from "../types";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const autoLogin: (req: IUserRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map