/*
  Warnings:

  - The primary key for the `carro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ano` on the `carro` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `carro` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `carro` table. All the data in the column will be lost.
  - You are about to alter the column `modelo` on the `carro` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `email` on the `pessoa` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `pessoaId` on the `telefone` table. All the data in the column will be lost.
  - You are about to drop the `pessoa_por_carro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Idprova` to the `carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pessoa_id` to the `telefone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."pessoa_por_carro" DROP CONSTRAINT "pessoa_por_carro_carroId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pessoa_por_carro" DROP CONSTRAINT "pessoa_por_carro_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."telefone" DROP CONSTRAINT "telefone_pessoaId_fkey";

-- DropIndex
DROP INDEX "public"."pessoa_email_key";

-- AlterTable
ALTER TABLE "public"."carro" DROP CONSTRAINT "carro_pkey",
DROP COLUMN "ano",
DROP COLUMN "id",
DROP COLUMN "marca",
ADD COLUMN     "Idprova" INTEGER NOT NULL,
ALTER COLUMN "modelo" DROP NOT NULL,
ALTER COLUMN "modelo" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "carro_pkey" PRIMARY KEY ("Idprova");

-- AlterTable
ALTER TABLE "public"."pessoa" DROP COLUMN "email",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(100);
DROP SEQUENCE "pessoa_id_seq";

-- AlterTable
ALTER TABLE "public"."telefone" DROP COLUMN "pessoaId",
ADD COLUMN     "pessoa_id" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "telefone_id_seq";

-- DropTable
DROP TABLE "public"."pessoa_por_carro";

-- CreateTable
CREATE TABLE "public"."pesso_por_carro" (
    "carro_Idprova" INTEGER NOT NULL,
    "pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "pesso_por_carro_pkey" PRIMARY KEY ("carro_Idprova","pessoa_id")
);

-- AddForeignKey
ALTER TABLE "public"."pesso_por_carro" ADD CONSTRAINT "pesso_por_carro_carro_Idprova_fkey" FOREIGN KEY ("carro_Idprova") REFERENCES "public"."carro"("Idprova") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pesso_por_carro" ADD CONSTRAINT "pesso_por_carro_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."telefone" ADD CONSTRAINT "telefone_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
