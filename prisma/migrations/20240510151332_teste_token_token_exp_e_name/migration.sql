/*
  Warnings:

  - Made the column `tokenExpiresAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tokenExpiresAt" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL;
