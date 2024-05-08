/*
  Warnings:

  - You are about to drop the column `shirtNumber` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `shirtSize` on the `members` table. All the data in the column will be lost.
  - Added the required column `uniformSize` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfJoinOnRugbyMaua` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "shirtNumber";
ALTER TABLE "members" DROP COLUMN "shirtSize";
ALTER TABLE "members" ADD COLUMN     "uniformNumber" INT4;
ALTER TABLE "members" ADD COLUMN     "uniformSize" STRING NOT NULL;
ALTER TABLE "members" ADD COLUMN     "yearOfJoinOnRugbyMaua" INT4 NOT NULL;
ALTER TABLE "members" ALTER COLUMN "ra" DROP NOT NULL;
