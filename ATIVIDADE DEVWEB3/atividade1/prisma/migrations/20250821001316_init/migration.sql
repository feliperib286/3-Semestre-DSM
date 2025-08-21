/*
  Warnings:

  - You are about to drop the `carro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pesso_por_carro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telefone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."carro";

-- DropTable
DROP TABLE "public"."pesso_por_carro";

-- DropTable
DROP TABLE "public"."pessoa";

-- DropTable
DROP TABLE "public"."telefone";

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
