import { Request, Response, NextFunction } from "express";
import User from "../db/entities/user";

export default async(req:Request, res:Response, next: NextFunction) => {
    try {
        const user: User | undefined = await res.locals.user;
        if(!user) {
            throw new Error("Unauthenticated user")
        }
        return next()
    } catch (error) {
        return res.status(401).json({error: "error from auth : Unauthenticated"+ error})
    }
}