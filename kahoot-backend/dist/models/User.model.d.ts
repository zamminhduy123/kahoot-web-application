import { Model } from "mongoose";
interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    refreshToken?: string;
}
interface IUserMethods {
    hashPassword(): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
    createJWT(): string;
    createRefreshToken(): Promise<string>;
    compareRefreshToken(candidateToken: string): Promise<boolean>;
}
declare type UserModel = Model<IUser, {}, IUserMethods>;
declare const _default: UserModel;
export default _default;
//# sourceMappingURL=User.model.d.ts.map