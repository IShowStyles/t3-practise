/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider_account_id";
