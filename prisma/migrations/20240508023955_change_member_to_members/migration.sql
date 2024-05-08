/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "members" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "name" STRING NOT NULL,
    "nickName" STRING NOT NULL,
    "cpf" INT8 NOT NULL,
    "rg" INT4 NOT NULL,
    "educationInstituition" STRING NOT NULL,
    "ra" INT4 NOT NULL,
    "course" STRING NOT NULL,
    "yearOfGraduation" INT4 NOT NULL,
    "phoneNumber" INT8 NOT NULL,
    "yearOfBirth" INT4 NOT NULL,
    "instagram" STRING NOT NULL,
    "lawsLink" STRING NOT NULL,
    "readyLink" STRING NOT NULL,
    "team" STRING NOT NULL,
    "shirtSize" STRING NOT NULL,
    "shirtNumber" INT4
);

-- CreateIndex
CREATE UNIQUE INDEX "members_id_key" ON "members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_cpf_key" ON "members"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "members_rg_key" ON "members"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "members_ra_key" ON "members"("ra");

-- CreateIndex
CREATE UNIQUE INDEX "members_phoneNumber_key" ON "members"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "members_instagram_key" ON "members"("instagram");
