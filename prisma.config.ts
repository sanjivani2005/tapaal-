import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node prisma/seed.js",
  },
  datasource: {
    url: "postgresql://c7855a5d5783c9487b7410a02847bfbb49af1c83bacd4dcf9a1cba8e5f7ba082:sk_lBtWtytB-esCpAoiWB0kx@db.prisma.io:5432/postgres?sslmode=require",
  },
});