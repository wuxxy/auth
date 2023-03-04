import querystring from "querystring";
import { FastifyReply } from "fastify";
export default (stack: any, res: FastifyReply, status = 500) => {
  let redirect = res.request.query["redirect"];

  if (redirect) {
    if (Object.values(querystring.parse(redirect))[0] != "") {
      return res.redirect(
        redirect + `&message=${"An+error+occured"}&status=${status}`
      );
    } else {
      return res.redirect(
        redirect + `?message=${"An+error+occured"}&status=${status}`
      );
    }
  }
  return res.status(status).send({
    message: "An error occured",
    stack,
    status,
    query: res.request.query,
  });
};
