import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      password, 
      role, 
      membershipId, 
      status, 
      startDate, 
      endDate,
      type 
    } = body;

    // Validasi data wajib
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Nama, email, password, dan role harus diisi" },
        { status: 400 }
      );
    }

    // Validasi role yang diperbolehkan
    const allowedRoles = ["admin", "user", "moderator"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { message: "Role tidak valid" },
        { status: 400 }
      );
    }

    // Validasi: pastikan email belum terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Data dasar user
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Kalau membershipId diisi → buat membership baru
    if (membershipId) {
      if (!startDate || !endDate || !type) {
        return NextResponse.json(
          { message: "Kalau ada membership, startDate, endDate, dan type harus diisi" },
          { status: 400 }
        );
      }

      userData.membership = {
        create: {
          id: String(membershipId), // pastikan jadi string
          status,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          type,
        },
      };
    }

    // Buat user baru
    const user = await prisma.user.create({
      data: userData,
      include: { membership: true },
    });

    return NextResponse.json(
      { message: "User berhasil dibuat", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { message: "Gagal membuat user" },
      { status: 500 }
    );
  }
}
