import { defineConfig } from "drizzle-kit"; 
export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_Auy4zMVFtxR5@ep-holy-waterfall-a5kd6uej-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
  }
});
 

 