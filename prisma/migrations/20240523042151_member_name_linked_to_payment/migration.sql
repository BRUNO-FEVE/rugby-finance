/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_memberId_fkey";

-- DropIndex
DROP INDEX "members_id_name_nickname_key";

-- CreateIndex
CREATE UNIQUE INDEX "members_id_name_key" ON "members"("id", "name");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_memberId_memberName_fkey" FOREIGN KEY ("memberId", "memberName") REFERENCES "members"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;
