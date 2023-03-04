import { FastifyRequest } from "fastify";
export interface RegisterBody extends FastifyRequest {
  body: { username?: string; password?: string; email?: string };
}
