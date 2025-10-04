// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
// 

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // Hash password
  const adminPassword = await hash("admin123", 10);
  const userPassword = await hash("user123", 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      password: adminPassword,
      membership: {
        create: {
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          status: "active",
          type: "premium",
        },
      },
    },
  });

  // Create Regular User
  const user = await prisma.user.create({
    data: {
      name: "Regular User",
      email: "user@example.com",
      role: "user",
      password: userPassword,
    },
  });

  // Example Account for Admin (e.g., OAuth GitHub)
  await prisma.account.create({
    data: {
      userId: admin.id,
      type: "oauth",
      provider: "github",
      providerAccountId: "123456",
      access_token: "example_access_token",
      token_type: "bearer",
      scope: "read:user",
    },
  });

  // Example Session for User
  await prisma.session.create({
    data: {
      userId: user.id,
      sessionToken: "session_token_example",
      expires: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days later
    },
  });

  // Example Verification Token
  await prisma.verificationToken.create({
    data: {
      identifier: "user@example.com",
      token: "verification_token_example",
      expires: new Date(new Date().setDate(new Date().getDate() + 1)), // 1 day later
    },
  });

  console.log("✅ Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
