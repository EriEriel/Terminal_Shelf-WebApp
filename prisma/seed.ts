import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Starting seed script...");

  // Clean the database first (optional, but useful for testing)
  // Note: We use deleteMany() for this.
  await prisma.entry.deleteMany();
  await prisma.tag.deleteMany();

  // Create some starter tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: "Fantasy" } }),
    prisma.tag.create({ data: { name: "Sci-Fi" } }),
    prisma.tag.create({ data: { name: "Slow Burn" } }),
    prisma.tag.create({ data: { name: "Time Travel" } }),
  ]);

  // Create some entries
  const entry1 = await prisma.entry.create({
    data: {
      title: "The Chronicles of Nexa",
      author: "A.R. Smith",
      category: "NOVEL",
      status: "READING",
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[2].id }],
      },
    },
  });

  const entry2 = await prisma.entry.create({
    data: {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      category: "FANFIC", // Let's say it's a fanfic rewrite!
      status: "COMPLETED",
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[3].id }],
      },
    },
  });

  const entry3 = await prisma.entry.create({
    data: {
      title: "Next.js 14 Documentation",
      url: "https://nextjs.org/docs",
      category: "BOOKMARK",
      status: "PLAN_TO_READ",
    },
  });

  console.log("Seed script finished! Added 3 entries.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
