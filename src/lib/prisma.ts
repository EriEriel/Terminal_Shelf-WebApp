import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    const mockHandler: ProxyHandler<any> = {
      get: (target, prop) => {
        // Return a function that resolves to an empty array
        // This satisfies .map() and other array methods
        const fn = () => Promise.resolve([]);
        return new Proxy(fn, mockHandler);
      },
    };
    return new Proxy({}, mockHandler) as unknown as PrismaClient;
  }

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
