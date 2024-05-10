-- CreateTable
CREATE TABLE "rugby-payment" (
    "id" STRING NOT NULL,
    "mouthsPayment" INT4[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]::INT4[]
);

-- CreateTable
CREATE TABLE "payment" (
    "id" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" STRING NOT NULL,
    "value" INT4 NOT NULL,
    "cause" STRING NOT NULL,
    "type" STRING
);

-- CreateIndex
CREATE UNIQUE INDEX "rugby-payment_id_key" ON "rugby-payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_id_key" ON "payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_date_key" ON "payment"("date");

-- AddForeignKey
ALTER TABLE "rugby-payment" ADD CONSTRAINT "rugby-payment_id_fkey" FOREIGN KEY ("id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_id_fkey" FOREIGN KEY ("id") REFERENCES "rugby-payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
