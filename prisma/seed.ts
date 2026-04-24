import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Starting seed script...");

  // 1. Clean the database
  // Note: We use deleteMany() for this. Order matters due to foreign keys.
  await prisma.image.deleteMany();
  await prisma.entry.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.shelf.deleteMany();

  // 2. Create a Seed User
  const user = await prisma.user.upsert({
    where: { email: "admin@terminal.shelf" },
    update: {},
    create: {
      email: "admin@terminal.shelf",
      name: "Admin User",
    },
  });

  // 3. Create a Default Shelf for that user
  const shelf = await prisma.shelf.create({
    data: {
      name: "Main Collection",
      userId: user.id,
      isDefault: true,
    },
  });

  // 4. Create some starter tags
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { name: "Fantasy" }, update: {}, create: { name: "Fantasy" } }),
    prisma.tag.upsert({ where: { name: "Sci-Fi" }, update: {}, create: { name: "Sci-Fi" } }),
    prisma.tag.upsert({ where: { name: "Technical" }, update: {}, create: { name: "Technical" } }),
    prisma.tag.upsert({ where: { name: "Seinen" }, update: {}, create: { name: "Seinen" } }),
  ]);

  // 5. Create some entries with the new categories
  await prisma.entry.create({
    data: {
      title: "Berserk",
      author: "Kentaro Miura",
      category: "MANGA",
      status: "READING",
      userId: user.id,
      shelfId: shelf.id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[3].id }],
      },
    },
  });

  await prisma.entry.create({
    data: {
      title: "Prisma Documentation",
      url: "https://www.prisma.io/docs",
      category: "DOCUMENTATION",
      status: "COMPLETED",
      userId: user.id,
      shelfId: shelf.id,
      tags: {
        connect: [{ id: tags[2].id }],
      },
    },
  });

  await prisma.entry.create({
    data: {
      title: "The Martian",
      author: "Andy Weir",
      category: "NOVEL",
      status: "PLAN_TO_READ",
      userId: user.id,
      shelfId: shelf.id,
      tags: {
        connect: [{ id: tags[1].id }],
      },
    },
  });

  console.log("Seed script finished! User 'admin@terminal.shelf' created with 3 entries.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
