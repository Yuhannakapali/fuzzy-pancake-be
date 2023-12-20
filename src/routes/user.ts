import express, { Request, Response } from "express";
import {
  findUserByEmail,
  loginUser,
  signupUser,
} from "../services/userServices";
import auth from "../middleware/auth";
import user from "../middleware/user";


const router = express.Router();

router.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "please fill all the credentials" });
    }
    const userfeature = { ...req.body };
    const newUser = await signupUser(userfeature);
    return res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" + error });
  }
});

router.get("/api/user/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).send("user not found");
  }
  return res.status(200).send(`welcome ${user.username}`);
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill all the credentials" });
    }
    const user = await loginUser(email, password);
    res.cookie("token", user.token, { httpOnly: true, maxAge: 360 });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/api/me", user, auth, (req: Request, res: Response) => {
  return res.json(res.locals.user);
});

router.get("/api/logout", user, auth, async (req: Request, res: Response) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  return res
    .status(200)
    .json({ sucess: true, msg: "user logged out successfully" });
});



export { router as userRouter };
