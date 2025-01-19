import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // https://nextjs.org/docs/messages/non-standard-node-env
    NODE_ENV: z.enum(["development", "production", "test"]),
    OPENFDA_API_KEY: z.string().base64(),
  },
  experimental__runtimeEnv: {},
});
