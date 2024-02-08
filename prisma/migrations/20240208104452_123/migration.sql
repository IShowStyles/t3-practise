/*
  Warnings:

  - You are about to drop the column `pizzaProductId` on the `Agreement` table. All the data in the column will be lost.
  - The required column `id` was added to the `UserAgreement` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_pizzaProductId_fkey";

-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "pizzaProductId";

-- AlterTable
ALTER TABLE "PizzaProduct" ADD COLUMN     "agreementId" TEXT;

-- AlterTable
ALTER TABLE "UserAgreement" ADD COLUMN     "id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PizzaAgreement" (
    "id" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,
    "pizzaProductId" TEXT NOT NULL,

    CONSTRAINT "PizzaAgreement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PizzaProduct" ADD CONSTRAINT "PizzaProduct_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaAgreement" ADD CONSTRAINT "PizzaAgreement_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaAgreement" ADD CONSTRAINT "PizzaAgreement_pizzaProductId_fkey" FOREIGN KEY ("pizzaProductId") REFERENCES "PizzaProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
