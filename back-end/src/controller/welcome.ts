import { RequestHandler } from "express";

export const welcome: RequestHandler = (req,res) => {
  return res.status(200).send("welcome to our handman game")
}