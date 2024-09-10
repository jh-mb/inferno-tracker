/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "task";

-- CreateTable
CREATE TABLE "tracker" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "client" TEXT NOT NULL,
    "products" TEXT[],
    "number_viacargo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracker_pkey" PRIMARY KEY ("id")
);
