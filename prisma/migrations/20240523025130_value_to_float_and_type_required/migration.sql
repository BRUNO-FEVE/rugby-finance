/*
  Warnings:

  - Changed the type of `value` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `type` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "value";
ALTER TABLE "payments" ADD COLUMN     "value" FLOAT8 NOT NULL;
ALTER TABLE "payments" ALTER COLUMN "type" SET NOT NULL;
