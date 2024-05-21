/*
  Warnings:

  - You are about to drop the column `nickName` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfBirth` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `memberNickName` on the `rugby_payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,name,nickname]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,memberName,memberNickname]` on the table `rugby_payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberNickname` to the `rugby_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rugby_payment" DROP CONSTRAINT "rugby_payment_memberId_memberName_memberNickName_fkey";

-- DropIndex
DROP INDEX "members_id_name_nickName_key";

-- DropIndex
DROP INDEX "rugby_payment_memberId_memberName_memberNickName_key";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "nickName";
ALTER TABLE "members" DROP COLUMN "yearOfBirth";
ALTER TABLE "members" ADD COLUMN     "dateOfBirth" STRING NOT NULL;
ALTER TABLE "members" ADD COLUMN     "nickname" STRING NOT NULL;

-- AlterTable
ALTER TABLE "rugby_payment" DROP COLUMN "memberNickName";
ALTER TABLE "rugby_payment" ADD COLUMN     "memberNickname" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_id_name_nickname_key" ON "members"("id", "name", "nickname");

-- CreateIndex
CREATE UNIQUE INDEX "rugby_payment_memberId_memberName_memberNickname_key" ON "rugby_payment"("memberId", "memberName", "memberNickname");

-- AddForeignKey
ALTER TABLE "rugby_payment" ADD CONSTRAINT "rugby_payment_memberId_memberName_memberNickname_fkey" FOREIGN KEY ("memberId", "memberName", "memberNickname") REFERENCES "members"("id", "name", "nickname") ON DELETE CASCADE ON UPDATE CASCADE;
