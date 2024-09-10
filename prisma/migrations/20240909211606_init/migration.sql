/*
  Warnings:

  - The primary key for the `tracker` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tracker" DROP CONSTRAINT "tracker_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "number" DROP DEFAULT,
ALTER COLUMN "number_viacargo" SET DATA TYPE BIGINT,
ADD CONSTRAINT "tracker_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tracker_number_seq";
