import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET untuk mengambil data user berdasarkan ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        membership: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

// PUT untuk mengupdate data user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validasi data wajib
    if (!body.name || !body.status || !body.role) {
      return NextResponse.json(
        { message: "Nama, status, dan role harus diisi" },
        { status: 400 }
      );
    }

    // Validasi role yang diperbolehkan
    const allowedRoles = ['admin', 'user', 'moderator'];
    if (!allowedRoles.includes(body.role)) {
      return NextResponse.json(
        { message: "Role tidak valid" },
        { status: 400 }
      );
    }

   const updatedUser = await prisma.user.update({
  where: { id: params.id },
  data: {
    name: body.name,
    role: body.role,
    membershipId: body.membershipId || null,
    membership: {
      upsert: {
        update: {
          status: body.status,
          startDate: body.startDate ? new Date(body.startDate) : undefined,
          endDate: body.endDate ? new Date(body.endDate) : undefined,
          type: body.type || "basic",
        },
        create: {
          status: body.status,
          startDate: body.startDate ? new Date(body.startDate) : new Date(),
          endDate: body.endDate ? new Date(body.endDate) : new Date(),
          type: body.type || "basic",
        },
      },
    },
  },
  include: {
    membership: true,
  },
});


    return NextResponse.json(
      { 
        message: "User berhasil diupdate", 
        user: updatedUser 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    
    // Handle error spesifik
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Gagal update user" },
      { status: 500 }
    );
  }
}

