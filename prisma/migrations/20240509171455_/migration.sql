/*
  Warnings:

  - Changed the type of `tokenExpiresAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenExpiresAt",
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3) NOT NULL;
