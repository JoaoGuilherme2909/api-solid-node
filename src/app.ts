import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { error } from "console";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error.", issues: err.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //TODO: log para ferramenta externa
  }

  return res.status(500).send({ message: "Internal server error" });
});
