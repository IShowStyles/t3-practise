/*
  Warnings:

  - You are about to drop the column `agreementId` on the `PizzaProduct` table. All the data in the column will be lost.
  - You are about to drop the column `userAgreementAgreementId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userAgreementUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PizzaAgreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAgreement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PizzaAgreement" DROP CONSTRAINT "PizzaAgreement_agreementId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaAgreement" DROP CONSTRAINT "PizzaAgreement_pizzaProductId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userAgreementUserId_userAgreementAgreementId_fkey";

-- DropForeignKey
ALTER TABLE "UserAgreement" DROP CONSTRAINT "UserAgreement_agreementId_fkey";

-- AlterTable
ALTER TABLE "PizzaProduct" DROP COLUMN "agreementId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userAgreementAgreementId",
DROP COLUMN "userAgreementUserId";

-- DropTable
DROP TABLE "PizzaAgreement";

-- DropTable
DROP TABLE "UserAgreement";

-- CreateTable
CREATE TABLE "_UserAgreements" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgreementPizzaProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAgreements_AB_unique" ON "_UserAgreements"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAgreements_B_index" ON "_UserAgreements"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AgreementPizzaProducts_AB_unique" ON "_AgreementPizzaProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_AgreementPizzaProducts_B_index" ON "_AgreementPizzaProducts"("B");

-- AddForeignKey
ALTER TABLE "_UserAgreements" ADD CONSTRAINT "_UserAgreements_A_fkey" FOREIGN KEY ("A") REFERENCES "Agreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAgreements" ADD CONSTRAINT "_UserAgreements_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgreementPizzaProducts" ADD CONSTRAINT "_AgreementPizzaProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Agreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgreementPizzaProducts" ADD CONSTRAINT "_AgreementPizzaProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "PizzaProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
