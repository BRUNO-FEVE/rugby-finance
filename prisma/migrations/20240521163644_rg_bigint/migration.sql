/*
  Warnings:

  - Changed the type of `rg` on the `members` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "rg";
ALTER TABLE "members" ADD COLUMN     "rg" INT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_rg_key" ON "members"("rg");
