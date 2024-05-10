/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,memberName]` on the table `rugby_payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberName` to the `rugby_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rugby_payment" DROP CONSTRAINT "rugby_payment_memberId_fkey";

-- AlterTable
ALTER TABLE "rugby_payment" ADD COLUMN     "memberName" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_id_name_key" ON "members"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "rugby_payment_memberId_memberName_key" ON "rugby_payment"("memberId", "memberName");

-- AddForeignKey
ALTER TABLE "rugby_payment" ADD CONSTRAINT "rugby_payment_memberId_memberName_fkey" FOREIGN KEY ("memberId", "memberName") REFERENCES "members"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;
