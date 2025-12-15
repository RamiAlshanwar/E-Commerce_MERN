import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    return { data: "User already exist", statusCode: 400 };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return { data: generateJWT({ firstName, lastName, email }), statusCode: 201 };
};

interface LoginParams {
  email: string;
  password: string;
}
export const loginUser = async ({ email, password }: LoginParams) => {
  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return { data: "incorrect username or password", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (!passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }
  return { data: "incorrect username or password", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "aE1vQ6wYxpEkpMABF1EnR0hPdw6BUsrt");
};
