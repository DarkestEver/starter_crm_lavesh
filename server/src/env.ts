import { z } from "zod";

const envVariables = z.object({
  MONGO_URL: z.string().nonempty(),
});

envVariables.parse(process.env);

declare global {
    namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export {}