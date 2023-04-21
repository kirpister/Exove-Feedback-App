import { RequestHandler } from 'express';

export const unknownEndpoint:RequestHandler =async (req, res) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}