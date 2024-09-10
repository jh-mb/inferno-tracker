/*
  Warnings:

  - The `products` column on the `tracker` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tracker" DROP COLUMN "products",
ADD COLUMN     "products" TEXT[];
