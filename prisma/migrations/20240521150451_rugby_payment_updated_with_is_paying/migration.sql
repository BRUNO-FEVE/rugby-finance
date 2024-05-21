/*
  Warnings:

  - Added the required column `isPaying` to the `rugby_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rugby_payment" ADD COLUMN     "isPaying" BOOL NOT NULL;
