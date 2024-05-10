/*
  Warnings:

  - A unique constraint covering the columns `[id,name,nickName]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,memberName,memberNickName]` on the table `rugby_payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberNickName` to the `rugby_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rugby_payment" DROP CONSTRAINT "rugby_payment_memberId_memberName_fkey";

-- DropIndex
DROP INDEX "members_id_name_key";

-- DropIndex
DROP INDEX "rugby_payment_memberId_memberName_key";

-- AlterTable
ALTER TABLE "rugby_payment" ADD COLUMN     "memberNickName" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_id_name_nickName_key" ON "members"("id", "name", "nickName");

-- CreateIndex
CREATE UNIQUE INDEX "rugby_payment_memberId_memberName_memberNickName_key" ON "rugby_payment"("memberId", "memberName", "memberNickName");

-- AddForeignKey
ALTER TABLE "rugby_payment" ADD CONSTRAINT "rugby_payment_memberId_memberName_memberNickName_fkey" FOREIGN KEY ("memberId", "memberName", "memberNickName") REFERENCES "members"("id", "name", "nickName") ON DELETE CASCADE ON UPDATE CASCADE;
