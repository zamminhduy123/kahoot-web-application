import { JSONSchemaType } from "ajv";
interface ILoginSchema {
    email: string;
    password: string;
}
declare const schema: JSONSchemaType<ILoginSchema>;
export default schema;
//# sourceMappingURL=login.schema.d.ts.map