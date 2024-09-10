/*
  Warnings:

  - The primary key for the `tracker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tracker` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE tracker_number_seq;
ALTER TABLE "tracker" DROP CONSTRAINT "tracker_pkey",
DROP COLUMN "id",
ALTER COLUMN "number" SET DEFAULT nextval('tracker_number_seq'),
ADD CONSTRAINT "tracker_pkey" PRIMARY KEY ("number");
ALTER SEQUENCE tracker_number_seq OWNED BY "tracker"."number";
