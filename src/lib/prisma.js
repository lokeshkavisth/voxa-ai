import ws from "ws";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

const prismaClientSingleton = () => {
  neonConfig.webSocketConstructor = ws;
  const connectionString = `${process.env.DATABASE_URL}`;

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

const globalThisRef = globalThis || global;

const prisma = globalThisRef.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThisRef.prismaGlobal = prisma;
}

export default prisma;
