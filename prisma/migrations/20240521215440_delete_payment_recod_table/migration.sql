/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rugby_payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_memberId_fkey";

-- DropForeignKey
ALTER TABLE "rugby_payment" DROP CONSTRAINT "rugby_payment_memberId_memberName_memberNickname_fkey";

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "isPaying" BOOL NOT NULL DEFAULT true;
ALTER TABLE "members" ADD COLUMN     "paymentRecord" INT4[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]::INT4[];

-- DropTable
DROP TABLE "payment";

-- DropTable
DROP TABLE "rugby_payment";

-- CreateTable
CREATE TABLE "payments" (
    "id" STRING NOT NULL,
    "memberId" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INT4 NOT NULL,
    "cause" STRING NOT NULL,
    "type" STRING
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_date_key" ON "payments"("date");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
