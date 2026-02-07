import { type Config } from "drizzle-kit";

import { keys } from "./src/keys";

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: keys().DATABASE_URL,
  },
  tablesFilter: ["learnin10_*"],
} satisfies Config;
