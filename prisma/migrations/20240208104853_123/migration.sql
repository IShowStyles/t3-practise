/*
  Warnings:

  - You are about to drop the `_AgreementToUser` table. If the table is not empty, all the data it contains will be lost.
  - The required column `agreementId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_AgreementToUser" DROP CONSTRAINT "_AgreementToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgreementToUser" DROP CONSTRAINT "_AgreementToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "agreementId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AgreementToUser";
