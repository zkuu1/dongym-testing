import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
        image:
          "https://res.cloudinary.com/duqxran5v/image/upload/v1757938955/470-4703547_privacy-icon-png_xfsthm.png",
        membershipId: "non membership",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create default membership untuk user baru
    await prisma.membership.create({
    data: {
        userId: user.id,
        id: user.id,
        startDate: new Date(),
        endDate: new Date(),
        status: "nonactive",
        type: "non membership",
    },
});


    return NextResponse.json({ user });
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat registrasi" },
      { status: 500 }
    );
  }
}
