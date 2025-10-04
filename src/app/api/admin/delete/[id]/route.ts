import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE untuk menghapus user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Hapus dulu data Membership yang terkait dengan user ini
    await prisma.membership.deleteMany({
      where: { userId: params.id },
    });

    // Hapus juga data lain yang mungkin terkait (sesuaikan dengan schema Anda)
    // Contoh: await prisma.order.deleteMany({ where: { userId: params.id } });
    // Contoh: await prisma.payment.deleteMany({ where: { userId: params.id } });

    // Kemudian hapus user
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "User berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}