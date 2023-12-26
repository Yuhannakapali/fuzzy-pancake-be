import User from "../db/entities/user"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

type UserType = {
    email: string,
    username: string,
    password: string
}


export const signupUser = async(userFeatures: UserType) => {
    const {email, username, password} = userFeatures
// eslint-disable-next-line no-useless-catch
try {
    const userWithEmail = await findUserByEmail(email);
    if(userWithEmail) {
        return {error: "User with email already exists"}
    }
    const newUser =  User.create({email, username, password});
    await newUser.save()
    return {msg: "User created successfully", user: newUser}
} catch (error) {
    throw error
}
}

export function generateJWT(payload:object) {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  }

  export const loginUser = async (email: string, password: string) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return { success: false, status:404, error: "user with this email does not exist" };
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return {
          success: false,
          status: 400,
          error: "password did not match with this email",
        };
      }
      const token = generateJWT({ email });
      return { success: true, status: 200, message: "welcome", token: token, username:user.username };
    } catch (error) {
      return { success: false, error: "something went wrong" + error};
    }
  };


export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  };

