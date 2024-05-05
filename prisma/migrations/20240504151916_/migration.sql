/*
  Warnings:

  - A unique constraint covering the columns `[rg]` on the table `Adm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Adm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `Adm` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `rg` on the `Adm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "rg";
ALTER TABLE "Adm" ADD COLUMN     "rg" INT4 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Adm_rg_key" ON "Adm"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Adm_email_key" ON "Adm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adm_password_key" ON "Adm"("password");
