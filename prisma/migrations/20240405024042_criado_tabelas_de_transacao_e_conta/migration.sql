-- CreateTable
CREATE TABLE "transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "tipo_transacao" TEXT NOT NULL,
    "data_transacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entrada" REAL NOT NULL,
    "saida" REAL NOT NULL,
    "total" REAL NOT NULL
);
