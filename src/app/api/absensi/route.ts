import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET semua absensi
export async function GET(req: Request) {
  try {
    const absensi = await prisma.absensi.findMany({
      orderBy: { tanggal_kunjungan: "desc" },
    });
    return NextResponse.json(absensi);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data absensi" }, { status: 500 });
  }
}

// 

// POST tambah absensi baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, no_member, status_kunjungan, tanggal } = body;

    if (!name || !status_kunjungan) {
      return NextResponse.json({ error: "Nama dan kunjungan wajib diisi" }, { status: 400 });
    }

    const newAbsensi = await prisma.absensi.create({
      data: {
        name, 
        no_member: no_member || null,
        status_kunjungan,
        tanggal_kunjungan: tanggal ? new Date(tanggal) : new Date(),
      },
    });

    return NextResponse.json(newAbsensi, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menambahkan absensi" }, { status: 500 });
  }
}

