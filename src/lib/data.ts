import prisma from "@/lib/prisma";

export async function getUsers(query?: string) {
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } }, // cari nama (case-insensitive)
      { id: { contains: query } }, // cari membershipId
    ];
  }

  return await prisma.user.findMany({
    where,
    
    select: {
      id: true,
      name: true,
      membershipId: true,
      role: true,
      membership: {
        select: {
          startDate: true,
          endDate: true,
          status: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc", 
    },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      membershipId: true,
      membership: {
        select: {
          startDate: true,
          endDate: true,
          status: true,
        },
      },
    },
  });
}
