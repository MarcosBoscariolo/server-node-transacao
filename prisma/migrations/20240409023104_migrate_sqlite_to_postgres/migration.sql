-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "categoria" TEXT NOT NULL,
    "tipo_transacao" TEXT NOT NULL,
    "data_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" INTEGER NOT NULL,
    "entrada" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "saida" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);
