/*
  Warnings:

  - You are about to drop the column `editonal` on the `Agreement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `PizzaProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `editional` to the `Agreement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `PizzaProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "editonal",
ADD COLUMN     "editional" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactRequest" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PizzaProduct" ADD COLUMN     "size" "PizzaSize" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PizzaProduct_name_key" ON "PizzaProduct"("name");

-- AddForeignKey
ALTER TABLE "ContactRequest" ADD CONSTRAINT "ContactRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
