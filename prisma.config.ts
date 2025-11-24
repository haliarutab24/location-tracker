import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    adapter: "sqlite",
    url: "file:./dev.db",
  },
});
