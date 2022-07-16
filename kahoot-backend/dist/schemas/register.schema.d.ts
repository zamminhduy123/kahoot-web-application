import { JSONSchemaType } from "ajv";
interface IRegisterSchema {
    email: string;
    name: string;
    password: string;
}
declare const schema: JSONSchemaType<IRegisterSchema>;
export default schema;
//# sourceMappingURL=register.schema.d.ts.map