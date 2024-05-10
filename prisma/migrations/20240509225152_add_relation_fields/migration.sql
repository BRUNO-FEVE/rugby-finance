/*
  Warnings:

  - You are about to drop the `rugby-payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_id_fkey";

-- DropForeignKey
ALTER TABLE "rugby-payment" DROP CONSTRAINT "rugby-payment_id_fkey";

-- DropTable
DROP TABLE "rugby-payment";

-- CreateTable
CREATE TABLE "rugby_payment" (
    "id" STRING NOT NULL,
    "memberId" STRING NOT NULL,
    "monthsPayment" INT4[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]::INT4[]
);

-- CreateIndex
CREATE UNIQUE INDEX "rugby_payment_id_key" ON "rugby_payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rugby_payment_memberId_key" ON "rugby_payment"("memberId");

-- AddForeignKey
ALTER TABLE "rugby_payment" ADD CONSTRAINT "rugby_payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "rugby_payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
