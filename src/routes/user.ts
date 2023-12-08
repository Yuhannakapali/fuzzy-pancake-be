import express, {Request, Response} from 'express';
import { loginUser, signupUser } from '../services/userServices';
import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post("/api/signup", async (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password) {
        return res.status(400).json({ error: "please fill all the credentials" });
      }
      const userfeature = { ...req.body };
      const newUser = await signupUser(userfeature)
      return res.status(200).json({ newUser });
    } catch (error) {
      return res.status(500).json({ error: "something went wrong"+ error });
    }          
  });


  router.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "please fill all the credentials" });
      }
      const user = await loginUser(email, password);
      res.cookie("token", user.token, { httpOnly: true, maxAge: 360000 });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: "something went wrong" });
    }
  });
  
  
  
  router.get("/api/me", user, auth, (req: Request, res: Response) => {
    return res.json(res.locals.user);
  });
  
  
  router.get("/api/logout",user, auth,  async(req,res) => {
    res.cookie("token", "", {httpOnly: true, expires: new Date(0)});
    return res.status(200).json({sucess: true, msg: "user logged out successfully"})
  })


  export {router as userRouter}