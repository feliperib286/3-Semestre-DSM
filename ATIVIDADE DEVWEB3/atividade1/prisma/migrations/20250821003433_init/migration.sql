-- CreateTable
CREATE TABLE "public"."telefone" (
    "id" SERIAL NOT NULL,
    "numeros" VARCHAR(11),
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."telefone" ADD CONSTRAINT "telefone_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
