/*
  Warnings:

  - Changed the type of `phoneNumber` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "phoneNumber";
ALTER TABLE "Member" ADD COLUMN     "phoneNumber" INT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_phoneNumber_key" ON "Member"("phoneNumber");
