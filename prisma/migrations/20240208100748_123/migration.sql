/*
  Warnings:

  - You are about to drop the column `userId` on the `Agreement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_userId_fkey";

-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserAgreement" (
    "userId" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,

    CONSTRAINT "UserAgreement_pkey" PRIMARY KEY ("userId","agreementId")
);

-- CreateTable
CREATE TABLE "_AgreementToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgreementToUser_AB_unique" ON "_AgreementToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AgreementToUser_B_index" ON "_AgreementToUser"("B");

-- AddForeignKey
ALTER TABLE "UserAgreement" ADD CONSTRAINT "UserAgreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAgreement" ADD CONSTRAINT "UserAgreement_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgreementToUser" ADD CONSTRAINT "_AgreementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Agreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgreementToUser" ADD CONSTRAINT "_AgreementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
