import { Request, Response, NextFunction } from "express";
export default function (schema: any): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.mdw.d.ts.map