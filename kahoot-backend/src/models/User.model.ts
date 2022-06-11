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
  getTest(): number;
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

UserSchema.method("hashPassword", async function () {
  const salt = await bcrypt.genSalt(10);
  this.customerPassword = await bcrypt.hash(this.customerPassword, salt);
});

export default model<IUser, UserModel>("User", UserSchema);
