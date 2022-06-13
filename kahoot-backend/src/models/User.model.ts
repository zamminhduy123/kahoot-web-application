import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
interface IUserMethods {
  hashPassword(): Promise<void>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    avatar: { type: String },
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

UserSchema.index({ email: 1 }, { unique: true });

export default model<IUser, UserModel>("User", UserSchema);
