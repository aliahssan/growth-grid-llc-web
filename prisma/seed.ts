import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "founder@growthgrid.dev";
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeImmediately!";
  const passwordHash = await hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      passwordHash,
      emailVerified: new Date(),
    },
    create: {
      email: adminEmail,
      name: "Growth Grid Admin",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.info(
    `Seed complete. Admin: ${adminEmail} (remember to rotate the password in production).`,
  );
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

