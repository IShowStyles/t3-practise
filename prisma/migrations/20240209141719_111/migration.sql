/*
  Warnings:

  - You are about to drop the column `agreementId` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `PizzaProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgreementAgreementId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgreementUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PizzaProduct" DROP CONSTRAINT "PizzaProduct_agreementId_fkey";

-- DropForeignKey
ALTER TABLE "UserAgreement" DROP CONSTRAINT "UserAgreement_userId_fkey";

-- AlterTable
ALTER TABLE "PizzaProduct" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "agreementId",
ADD COLUMN     "userAgreementAgreementId" TEXT NOT NULL,
ADD COLUMN     "userAgreementUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAgreementUserId_userAgreementAgreementId_fkey" FOREIGN KEY ("userAgreementUserId", "userAgreementAgreementId") REFERENCES "UserAgreement"("userId", "agreementId") ON DELETE RESTRICT ON UPDATE CASCADE;
