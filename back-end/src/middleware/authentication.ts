import { RequestHandler } from 'express';


export const authentication :RequestHandler =async(req,res)=> { 
  return res.status(401).send('require toke')
}