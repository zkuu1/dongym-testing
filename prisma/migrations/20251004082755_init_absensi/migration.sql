-- CreateTable
CREATE TABLE "public"."Absensi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "no_member" TEXT,
    "status_kunjungan" TEXT NOT NULL,
    "tanggal_kunjungan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);
