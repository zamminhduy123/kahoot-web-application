import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  compareRefreshToken(candidateToken: string): boolean;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    avatar: { type: String },
    refreshToken: {type: String},
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.hashPassword =  async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(
    candidatePassword,
    this.password,
  );
  return isMatch;
};

UserSchema.methods.createJWT =  function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
}

UserSchema.methods.createRefreshToken = async function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESHTOKEN_LIFETIME, //1 day
  });
  this.refreshToken = token;
  await this.save();
  return token;
};

UserSchema.methods.compareRefreshToken = function (candidateToken: string) {
  return candidateToken === this.refreshToken;
};

UserSchema.index({ email: 1 }, { unique: true });
export default model<IUser, UserModel>("User", UserSchema);
