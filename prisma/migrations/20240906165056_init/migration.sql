/*
  Warnings:

  - Added the required column `status` to the `tracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracker" ADD COLUMN     "status" TEXT NOT NULL;
