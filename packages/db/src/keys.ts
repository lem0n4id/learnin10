import "dotenv/config";

import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().url(),
});

export const keys = () => {
  const runtimeEnv = {
    DATABASE_URL: process.env.DATABASE_URL,
  };

  if (process.env.SKIP_ENV_VALIDATION) {
    return runtimeEnv as { DATABASE_URL: string };
  }

  return schema.parse(runtimeEnv);
};
