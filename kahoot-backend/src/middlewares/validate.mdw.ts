import Ajv, {JSONSchemaType} from 'ajv';
import {Request, Response, NextFunction} from "express";

export default function (schema: JSONSchemaType<any>) {
  return function validate(req: Request, res: Response, next: NextFunction) {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      return res.status(400).json(ajv.errors);
    }

    next();
  }
}