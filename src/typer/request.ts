import { NextApiRequest } from 'next';
import { IncomingMessage } from 'node:http';

export type NextRequestType = NextApiRequest | IncomingMessage