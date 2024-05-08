/*
  Warnings:

  - Changed the type of `cpf` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "cpf";
ALTER TABLE "Member" ADD COLUMN     "cpf" INT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_cpf_key" ON "Member"("cpf");
