-- CreateTable
CREATE TABLE "Adm" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "rg" STRING NOT NULL,
    "area" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Member" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "nickName" STRING NOT NULL,
    "cpf" INT4 NOT NULL,
    "rg" INT4 NOT NULL,
    "educationInstituition" STRING NOT NULL,
    "ra" INT4 NOT NULL,
    "course" STRING NOT NULL,
    "yearOfGraduation" INT4 NOT NULL,
    "phoneNumber" INT4 NOT NULL,
    "yearOfBirth" INT4 NOT NULL,
    "instagram" STRING NOT NULL,
    "lawsLink" STRING NOT NULL,
    "readyLink" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Adm_id_key" ON "Adm"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_id_key" ON "Member"("id");
